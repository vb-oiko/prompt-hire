import z from "zod";
import { getParseTextToJsonFunction } from "../prompts/ParseTextToJsonPrompt";

const PositionInfoSchema = z.object({
  title: z.string().nullable().describe("The title of the position"),
  company: z.string().nullable().describe("The company of the position"),
  location: z.string().nullable().describe("The location of the position"),
  salary: z.string().nullable().describe("The salary of the position"),
  skills: z.array(z.string()).nullable().describe(
    "hard and soft skills required for this position" // ordered from most to least important
  ),
});

export type PositionInfo = z.infer<typeof PositionInfoSchema>;

const parsePositionInfo = getParseTextToJsonFunction(PositionInfoSchema);

export default { parsePositionInfo };
