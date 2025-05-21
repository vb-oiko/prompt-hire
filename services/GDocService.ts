import { docs_v1, drive_v3, google } from "googleapis";
import Auth from "google-auth-library";

import {
  GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_ROOT_FOLDER_ID,
  GOOGLE_COVER_LETTER_TEMPLATE_ID,
  GOOGLE_RESUME_TEMPLATE_ID,
} from "../const";
import { flattenObject } from "./utils/flattenObject";
import { UserInfo } from "../tables/UserInfoTable";
import { Resume } from "./ai/schemas/ResumeSchema";
import { Position } from "../tables/PositionTable";
import { CoverLetter } from "./ai/schemas/CoverLetterSchema";

let auth: Auth.JWT;
let drive: drive_v3.Drive;
let docs: docs_v1.Docs;

function getAuthInstance() {
  if (!auth) {
    auth = new google.auth.JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/documents",
      ],
    });
  }

  return auth;
}

function getDriveInstance() {
  if (!auth) {
    auth = getAuthInstance();
  }

  if (!drive) {
    drive = google.drive({ version: "v3", auth: auth });
  }

  return drive;
}

function getDocsInstance() {
  if (!auth) {
    auth = getAuthInstance();
  }

  if (!docs) {
    docs = google.docs({ version: "v1", auth: auth });
  }

  return docs;
}

const createCompanySubFolder = async (company: string) => {
  const folder = await getDriveInstance().files.create({
    requestBody: {
      name: company,
      mimeType: "application/vnd.google-apps.folder",
      parents: [GOOGLE_ROOT_FOLDER_ID],
    },
  });

  if (!folder.data.id) {
    throw new Error("Failed to create a new subfolder with the company name");
  }

  return folder.data.id;
};

const copyTemplate = async ({
  name,
  folderId,
  templateId,
}: {
  name: string;
  folderId: string;
  templateId: string;
}) => {
  const newDoc = await getDriveInstance().files.copy({
    fileId: templateId,
    requestBody: {
      name,
      parents: [folderId],
    },
  });

  if (!newDoc.data.id) {
    throw new Error("Failed to copy the template");
  }

  return newDoc.data.id;
};

const replacePlaceholders = async (
  templateId: string,
  params: Record<string, string>
) => {
  const requests = Object.entries(params).map(([key, value]) => ({
    replaceAllText: {
      containsText: {
        text: `{${key}}`,
        matchCase: true,
      },
      replaceText: value,
    },
  }));

  await getDocsInstance().documents.batchUpdate({
    documentId: templateId,
    requestBody: {
      requests,
    },
  });
};

const getCurrentDate = () => {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const createResume = async (
  folderId: string,
  params: Record<string, string>
) => {
  const resumeId = await copyTemplate({
    name: `${params.title} - Resume - ${params.name}`,
    folderId,
    templateId: GOOGLE_RESUME_TEMPLATE_ID,
  });

  await replacePlaceholders(resumeId, params);

  return resumeId;
};

const createCoverLetter = async (
  folderId: string,
  params: CoverLetterParams
) => {
  const coverLetterId = await copyTemplate({
    name: `${params.title} - Cover Letter - ${params.name}`,
    folderId,
    templateId: GOOGLE_COVER_LETTER_TEMPLATE_ID,
  });

  await replacePlaceholders(coverLetterId, params);

  return coverLetterId;
};

const getDocumentUrl = async (documentId: string) => {
  const document = await getDriveInstance().files.get({
    fileId: documentId,
    fields: "webViewLink",
  });

  const { webViewLink } = document.data;

  if (!webViewLink) {
    throw new Error("Failed to get the document URL");
  }

  return webViewLink;
};

export const createDocuments = async ({
  position,
  resume,
  userInfo,
  coverLetter,
}: {
  position: Position;
  resume: Resume;
  userInfo: UserInfo;
  coverLetter: CoverLetter;
}) => {
  console.log("Creating documents started");

  const folderId = await createCompanySubFolder(position.company);

  const docParams = flattenObject(resume);

  const resumeId = await createResume(folderId, {
    ...docParams,
    phone: userInfo.phone,
    title: position.title || "",
  });

  const coverLetterId = await createCoverLetter(folderId, {
    name: userInfo.name,
    title: position.title || "",
    location: userInfo.location,
    company: position.company || "",
    phone: userInfo.phone,
    email: userInfo.email,
    date: getCurrentDate(),
    ...flattenObject(coverLetter),
  });

  const resumeUrl = await getDocumentUrl(resumeId);
  const coverLetterUrl = await getDocumentUrl(coverLetterId);

  console.log("Creating documents finished");
  return { resumeUrl, coverLetterUrl };
};

export interface ResumeParams extends Record<string, string> {
  name: string;
  title: string;
  city: string;
  company: string;
  objective: string;
}

export interface CoverLetterParams extends Record<string, string> {
  name: string;
  title: string;
  location: string;
  company: string;
  phone: string;
  email: string;
  date: string;
}

export interface CreateDocumentsParams extends ResumeParams, CoverLetterParams {
  company: string;
}
