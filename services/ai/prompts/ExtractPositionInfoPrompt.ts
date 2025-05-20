import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const ExtractPositionInfoPrompt: Prompt<
  {
    description: string;
  },
  z.ZodSchema
> = (input, outputSchema) => {
  return `
    <data>
        <jobDescription>
            ${input.description} 
        </jobDescription>
        <output-schema>
            ${JSON.stringify(zodToJsonSchema(outputSchema, { target: "openAi" }))}
        </output-schema>
        <output-example>
            {
                "title": "Software Engineer",
                "company": "Google",
                "location": "Mountain View, CA",
                "salary": "$120,000 - $140,000"
            }
        </output-example>
    </data>
    <instructions>
        You are a helpful assistant that extracts information from a job description.
        Extract the information from the provided job description.
        Output should be a JSON object defined by the schema.
        output-example is an example of the response you should return.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

const ExtractPositionInfoOutputSchema = z.object({
  title: z.string().nullable().describe("The title of the position"),
  company: z.string().nullable().describe("The company of the position"),
  location: z.string().nullable().describe("The location of the position"),
  salary: z.string().nullable().describe("The salary of the position"),
});

export const extractPositionInfo = getCompletionFunction(
  ExtractPositionInfoPrompt,
  ExtractPositionInfoOutputSchema
);
