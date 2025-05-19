import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";

export const ResumeOptimizationPrompt: Prompt<{
  resume: string;
  jobDescription: string;
}> = (input) => {
  return `
    <data>
        <resume>
        ${input.resume}
        </resume>
        <job-description>
        ${input.jobDescription}
        </job-description>
    </data>
    <instructions>
        You are a helpful assistant that optimizes resumes for ATS (Applicant Tracking System) compatibility.
        Analyze the provided resume and job description to:

        1. Identify key responsibilities, skills, and phrases from the job description
        2. Suggest specific improvements to align the resume with the job requirements
        3. Provide an optimized version of the resume that incorporates relevant keywords naturally

        Output should be a JSON object with the following fields:
        - keySkills: string[] (list of key skills identified from the job description)
        - suggestedImprovements: string[] (list of specific suggestions for improvement)
        - optimizedResume: string (the optimized version of the resume)

        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

const ResumeOptimizationOutputSchema = z.object({
  keySkills: z.array(z.string()),
  suggestedImprovements: z.array(z.string()),
  optimizedResume: z.string(),
});

export const optimizeResume = getCompletionFunction(
  ResumeOptimizationPrompt,
  ResumeOptimizationOutputSchema
);
