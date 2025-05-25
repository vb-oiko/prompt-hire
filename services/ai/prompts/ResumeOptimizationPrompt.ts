import { z } from "zod";
import {
  ChatPrompt,
  getChatCompletionFunction,
  getCompletionFunction,
  Prompt,
} from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ResumeOptimizationPrompt: Prompt<
  {
    resume: string;
    jobDescription: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return `
    <context>
        <resume>
        ${input.resume}
        </resume>
        <job-description>
        ${input.jobDescription}
        </job-description>
        <output-schema>
            ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
        </output-schema>
    </context>
    <instructions>
        I want to tailor my resume to improve my chances of getting past an Applicant Tracking System (ATS). Please help me align my resume with this job description by following these steps:
        - Identify key responsibilities, skills, and phrases from the job description.
        - Rewrite or adjust my resume content to incorporate those keywords and phrases naturally, especially in bullet points and skill summaries.
        - Each experience item should follow STAR method: it should include overview (a couple of sentences) to serve as "situation" and "task", and bullet points to serve as "action" and "result". Bullet points should be concise and results-oriented. Use active verbs and quantify achievements where possible.
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

export const getOptimizedSummaryPrompt: ChatPrompt<
  {
    resumeJson: Record<string, unknown>;
    jobDescription: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return [
    {
      role: "system",
      content:
        "You are an expert resume writer helping candidates tailor their resumes for specific job postings. Write concise and compelling professional summaries that align with the job description and highlight the candidate's most relevant experience, achievements, and technical skills.",
    },
    {
      role: "user",
      content: `
      You are writing a professional summary section for a resume.

      Job title, company and key skills required for the role are mentioned in the job description:
      ${input.jobDescription}

      Candidate background is provided in structured form:
      ${JSON.stringify(input.resumeJson, null, 2)}

      Write a 3 sentence first person summary that:
      - Includes the candidate's years of experience.
      - Mentions skills listed under 'skillsToLearn' if needed in the corresponding context.
      - Reflects career progression and technical breadth.
      - Emphasizes alignment with the job's priorities.
      - Optionally includes career motivations or values if strongly aligned.
      - Uses wording from the job description as much as possible to optimize for ATS.

      Write a JSON object with this format and nothing else:
      ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
      `,
    },
  ];
};

export const optimizeSummary = getChatCompletionFunction(
  getOptimizedSummaryPrompt,
  z.object({
    summary: z.string(),
  })
);
