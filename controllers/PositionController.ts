import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import PositionTable, { Position } from "../tables/PositionTable.ts";
import { POSITION_STATUS } from "../tables/PositionTable.ts";
import { optimizeResume } from "../services/ai/prompts/ResumeOptimizationPrompt.ts";
import UserInfoTable, { STRUCTURED_RESUME } from "../tables/UserInfoTable.ts";
import { createDocuments } from "../services/GDocService.ts";
import {
  parseResume,
  ResumeSchema,
} from "../services/ai/schemas/ResumeSchema.ts";
import { generateCoverLetter } from "../services/ai/prompts/CoverLetterPrompt.ts";
import {
  parseCoverLetter,
  CoverLetterSchema,
} from "../services/ai/schemas/CoverLetterSchema.ts";
import { parseJobSkills } from "../services/ai/prompts/JobSkillsPrompt.ts";
import PositionInfoSchema from "../services/ai/schemas/PositionInfoSchema.ts";

async function createPosition({
  description,
  url,
}: {
  description: string;
  url: string;
}) {
  const position: Omit<Position, "id"> = {
    description,
    url,
    status: POSITION_STATUS.NEW,
    userId: 1, // TODO: Replace with actual user ID from session
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    title: "",
    company: "",
  };

  const id = await PositionTable.create(position);

  await parsePositionInfo({
    positionId: id,
    positionDescription: description,
  });

  return id;
}

async function parsePositionSkills({ positionId }: { positionId: number }) {
  const position = await PositionTable.getById(positionId);

  if (!position) {
    throw new Error("Position not found");
  }

  const jobSkills = await parseJobSkills({
    jobDescription: position.description,
  });

  return jobSkills;
}

async function parsePositionInfo({
  positionId,
  positionDescription,
}: {
  positionId: number;
  positionDescription: string;
}) {
  const positionInfo = await PositionInfoSchema.parsePositionInfo({
    text: positionDescription,
  });

  await PositionTable.update(positionId, {
    title: positionInfo.title || undefined,
    company: positionInfo.company || undefined,
    location: positionInfo.location || undefined,
    salary: positionInfo.salary || undefined,
    skills: positionInfo.skills?.join(",") || undefined,
  });
}

async function tailorResume({ positionId }: { positionId: number }) {
  const position = await PositionTable.getById(positionId);

  if (!position) {
    throw new Error("Position not found");
  }

  const userInfo = await UserInfoTable.getUserInfo(position.userId);

  if (!userInfo) {
    throw new Error("User not found");
  }

  const { optimizedResume } = await optimizeResume({
    resume: userInfo.resume,
    jobDescription: position.description,
  });

  await PositionTable.update(position.id, {
    optimizedResumeText: optimizedResume,
  });

  const resumeJson = await parseResume({ text: optimizedResume });

  await PositionTable.update(position.id, {
    optimizedResumeJson: JSON.stringify(resumeJson, null, 2),
  });
}

async function tailorCoverLetter({ positionId }: { positionId: number }) {
  const position = await PositionTable.getById(positionId);

  if (!position || !position.optimizedResumeText) {
    throw new Error("Position or resume not found");
  }

  const { coverLetter } = await generateCoverLetter({
    resume: JSON.stringify(STRUCTURED_RESUME, null, 2),
    jobDescription: position.description,
    additionalJoiningReasons: position.additionalJoiningReasons || "",
  });

  const coverLetterJson = await parseCoverLetter({ text: coverLetter });

  await PositionTable.update(position.id, {
    coverLetterText: coverLetter,
    coverLetterJson: JSON.stringify(coverLetterJson, null, 2),
  });
}

async function generateResumeAndCoverLetter({
  positionId,
}: {
  positionId: number;
}) {
  const position = await PositionTable.getById(positionId);

  if (!position) {
    throw new Error("Position not found");
  }
  if (!position.optimizedResumeJson) {
    throw new Error("Resume is not optimized");
  }
  if (!position.coverLetterJson) {
    throw new Error("Cover letter is not optimized");
  }

  const resume = JSON.parse(position.optimizedResumeJson);
  ResumeSchema.parse(resume);

  const coverLetter = JSON.parse(position.coverLetterJson);
  CoverLetterSchema.parse(coverLetter);

  const userInfo = await UserInfoTable.getUserInfo(position.userId);

  if (!userInfo) {
    throw new Error("User not found");
  }

  const documents = await createDocuments({
    position,
    resume,
    userInfo,
    coverLetter,
  });

  await PositionTable.update(position.id, {
    resumeUrl: documents.resumeUrl,
    coverLetterUrl: documents.coverLetterUrl,
  });
}

async function startTailoringWorkflow({ positionId }: { positionId: number }) {
  await tailorResume({ positionId });
  await tailorCoverLetter({ positionId });
  await generateResumeAndCoverLetter({ positionId });
}

const PositionController = {
  createPosition,
  parsePositionSkills,
  parsePositionInfo,
  tailorResume,
  tailorCoverLetter,
  generateResumeAndCoverLetter,
  startTailoringWorkflow,
};

export default PositionController;
