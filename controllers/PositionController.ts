import { Router } from "express";
import type { Request, Response, NextFunction } from "express";
import PositionTable, { Position } from "../tables/PositionTable.ts";
import { POSITION_STATUS } from "../tables/PositionTable.ts";
import { optimizeResume } from "../services/ai/prompts/ResumeOptimizationPrompt.ts";
import UserInfoTable from "../tables/UserInfoTable.ts";
import { createDocuments } from "../services/GDocService.ts";
import {
  parseResume,
  ResumeSchema,
} from "../services/ai/schemas/ResumeSchema.ts";
import { parsePositionInfo } from "../services/ai/schemas/PositionInfoSchema.ts";
import { generateCoverLetter } from "../services/ai/prompts/CoverLetterPrompt.ts";
import {
  parseCoverLetter,
  CoverLetterSchema,
} from "../services/ai/schemas/CoverLetterSchema.ts";
import { parseJobSkills } from "../services/ai/prompts/JobSkillsPrompt.ts";

async function CreatePosition({
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

const PositionController = {
  create: CreatePosition,
  parseSkills: parsePositionSkills,
};

export default PositionController;
