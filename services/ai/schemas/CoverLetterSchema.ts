import z from "zod";
import { getParseTextToJsonFunction } from "../prompts/ParseTextToJsonPrompt";

export const CoverLetterSchema = z.object({
  opening: z
    .string()
    .describe(
      "The opening of the cover letter. It starts with greeting, includes introduction, and a brief summary of the applicant's skills and experience. It ends before key skills section."
    ),
  keySkills: z
    .array(
      z.object({
        skill: z.string().describe("skill name"),
        performingExample: z
          .string()
          .describe("example how the applicant performed well in that skill"),
      })
    )
    .describe(
      "The key skills of the applicant. It is a list of skills that the applicant has that are relevant to the job description with examples of how the applicant performed well in that skill."
    ),
  closing: z
    .string()
    .describe(
      "The closing of the cover letter. It starts with a closing statement, and ends before the signature."
    ),
});

export type CoverLetter = z.infer<typeof CoverLetterSchema>;

export const parseCoverLetter = getParseTextToJsonFunction(CoverLetterSchema);
