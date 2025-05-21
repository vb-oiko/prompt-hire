import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const CoverLetterPrompt: Prompt<
  {
    resume: string;
    additionalJoiningReasons: string;
    jobDescription: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return `
    <data>
      <resume >
        ${input.resume}
      </resume>
      <job-description>
        ${input.jobDescription}
      </job-description>
      <template>
          Name							     Professional Title
          Address | Phone | email@email.com

          Date

          Company Name

          Dear Hiring Manager,

          I am excited to submit my application for this [JOB TITLE] position at [COMPANY NAME]. I found this job posting online and after comparing the responsibilities to my own skills and interests, I jumped at the chance to apply. I believe my [NUMBER OF YEARS] years’ experience in [INDUSTRY] have allowed me to develop the critical skills needed to excel in this role.

          In my resume, as well as the page below, I have taken the time to highlight some of my specific experiences that have prepared me to be a strong contributor to your team in this [JOB TITLE] position.


          Key Skill: Two-line bullet point here.

          Key Skill: Two-line bullet point here.

          Key Skill: Two-line bullet point here.

          Key Skill: Two-line bullet point here.

          Key Skill: Two-line bullet point here.


          Finally, I am thrilled at the prospect of joining such an impressive organization. [COMPANY NAME] has a great reputation and strong values that closely align with my own. I would be grateful for the chance to contribute to your future success. Thank you very much for reviewing my application and I look forward to further communication.

          Sincerely,

          Name
        </template>
        <additional-joining-reasons>
          ${input.additionalJoiningReasons}
        </additional-joining-reasons>
        <output-schema>
        ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
      </output-schema>
    </data>
    <instructions>
        You are a helpful assistant that writes cover letter.
        Analyze the provided resume and job description.
        Identify top 6 skills required for the job.
        For each key skill write an example how the applicant performed well in that skill judging by the provided resume.
        Write a compelling and professional cover latter that follows the structure of the providedtemplate.
        Return only the cover letter as string field defined by the output-schema.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

export const generateCoverLetter = getCompletionFunction(
  CoverLetterPrompt,
  z.object({
    coverLetter: z.string(),
  })
);
