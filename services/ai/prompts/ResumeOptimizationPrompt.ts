import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ResumeOptimizationPrompt: Prompt<
  {
    resume: string;
    jobDescription: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return `
    <data>
        <resume>
        ${input.resume}
        </resume>
        <job-description>
        ${input.jobDescription}
        </job-description>
        <output-schema>
            ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
        </output-schema>
    </data>
    <instructions>
        I want to tailor my resume to improve my chances of getting past an Applicant Tracking System (ATS). Please help me align my resume with this job description by following these steps:
        - Identify key responsibilities, skills, and phrases from the job description.
        - Rewrite or adjust my resume content to incorporate those keywords and phrases naturally, especially in bullet points and skill summaries.
        - Each experience item should folow STAR method: it should include overview (a couple of setntences) to serve as "situation" and "task", and bullet points to serve as "action" and "result". Bullet points should be concise and results-oriented. Use active verbs and quantify achievements where possible.
        - Add a new section called "Additional Skills" that includes skills required by the job description that are not listed in the experience, education, or volunteering sections.
        Return only the optimized resume as string field defined by the output-schema.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

export const optimizeResume = getCompletionFunction(
  ResumeOptimizationPrompt,
  z.object({
    optimizedResume: z.string(),
  })
);
