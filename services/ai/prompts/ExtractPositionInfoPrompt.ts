import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";

export const ExtractPositionInfoPrompt: Prompt<{
  description: string;
}> = (input) => {
  return `
    <data>
        <jobDescription>
            ${input.description} 
        </jobDescription>
        <response-example>
            {
                "title": "Software Engineer",
                "company": "Google",
                "location": "Mountain View, CA",
                "salary": "$120,000 - $140,000"
            }
    </data>
    <instructions>
        You are a helpful assistant that extracts information from a job description.
        Extract the following information from the job description:

        Output should be a JSON object with the following fields:
        - title: string
        - company: string
        - location: string
        - salary: string

        If some of the fields do not contain the information, return null for the field.
        response-example is an example of the response you should return.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

const ExtractPositionInfoOutputSchema = z.object({
  title: z.string().nullable(),
  company: z.string().nullable(),
  location: z.string().nullable(),
  salary: z.string().nullable(),
});

export const extractPositionInfo = getCompletionFunction(
  ExtractPositionInfoPrompt,
  ExtractPositionInfoOutputSchema
);
