import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const LinkedinFollowUpPrompt: Prompt<
  {
    resume: string;
    jobDescription: string;
    contactName: string;
    positionTitle: string;
  },
  z.ZodSchema
> = (input, schema) => {
  return `
    <instructions>
      You are a helpful assistant that writes messages to connect with people on LinkedIn.
      Write a LinkedIn follow-up message (after connection is accepted) taking into account provided job description, resume and template.
      Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
      Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
    <context>
      <resume >
        ${input.resume}
      </resume>
      <job-description>
        ${input.jobDescription}
      </job-description>
      <template>
      Hi ${input.contactName}, thanks for connecting! I recently applied to the ${input.positionTitle} position and am especially excited about [part of the job the candidate is most excited about]. I'd love to join your team because [reason the candidate is most excited about this company/department].

      I believe I'd be a strong contributor thanks to [candidate's top strength]. I submitted my application through the formal process, but if you're open to a quick chat, I'd appreciate it. Either way, I'm excited about the opportunity and hope to connect further.
      </template>
      <output-schema>
        ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
      </output-schema>
    </context>
    
  `;
};

export const generateLinkedinFollowUp = getCompletionFunction(
  LinkedinFollowUpPrompt,
  z.object({
    message: z.string(),
  })
);
