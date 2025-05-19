import dotenv from "dotenv";
dotenv.config();

export const SALT_ROUNDS = 10;
export const DB_FILE_NAME = "db.sqlite";
export const DB_FILE_FOLDER = "./db";
// export const SESSION_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 1 week

export const DB_FILE_PATH = `${DB_FILE_FOLDER}/${DB_FILE_NAME}`;
// export const SESSION_SECRET = process.env.SESSION_SECRET;
// export const CSRF_SECRET = process.env.CSRF_SECRET;
export const COOKIE_PARSER_SECRET = process.env.COOKIE_PARSER_SECRET;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
export const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY!;
export const GOOGLE_ROOT_FOLDER_ID = process.env.GOOGLE_ROOT_FOLDER_ID!;
export const GOOGLE_COVER_LETTER_TEMPLATE_ID =
  process.env.GOOGLE_COVER_LETTER_TEMPLATE_ID!;
export const GOOGLE_RESUME_TEMPLATE_ID = process.env.GOOGLE_RESUME_TEMPLATE_ID!;
