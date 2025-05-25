import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const jobSkillSchema = z.array(
  z.object({
    name: z
      .string()
      .min(1)
      .trim()
      .describe("Skill name as extracted or phrased in the job description."),
    priority: z
      .number()
      .min(1)
      .max(10)
      .describe(
        "Priority level indicating how important this skill is for this specific job. Higher number = more important."
      ),
  })
);

export type JobSkills = z.infer<typeof jobSkillSchema>;

export const jobSkillsPrompt: Prompt<
  {
    jobDescription: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return `
    <context>
        <job-description>
        ${input.jobDescription}
        </job-description>
        <output-schema>
            ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }), null, 2)}
        </output-schema>
    </context>
    <instructions>
        You are an expert career advisor helping a job seeker tailor their resume and cover letter.
        Given the full job description, extract a list of key skills required for the role. For each skill:
        - Set name to the exact phrase used in the job description that describes a required skill, competency, or tool.
        - Set priority to a number from 1 to 10, where:
            - 10 means critical to the role, mentioned explicitly or emphasized multiple times.
            - 5-9 means important, mentioned clearly at least once.
            - 1-4 means nice to have or implied.

        Return your result as a JSON array of objects matching the provided schema.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

export const parseJobSkills = getCompletionFunction(
  jobSkillsPrompt,
  jobSkillSchema
);
