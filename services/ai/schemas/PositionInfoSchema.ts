import z from "zod";
import { getParseTextToJsonFunction } from "../prompts/ParseTextToJsonPrompt";

const PositionInfoSchema = z.object({
  title: z.string().nullable().describe("The title of the position"),
  company: z.string().nullable().describe("The company of the position"),
  location: z.string().nullable().describe("The location of the position"),
  salary: z.string().nullable().describe("The salary of the position"),
});

export type PositionInfo = z.infer<typeof PositionInfoSchema>;

export const parsePositionInfo = getParseTextToJsonFunction(PositionInfoSchema);
