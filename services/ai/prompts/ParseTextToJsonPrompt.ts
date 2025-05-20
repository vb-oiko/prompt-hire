import { z } from "zod";
import { getCompletionFunction, Prompt } from "../AiService";
import { zodToJsonSchema } from "zod-to-json-schema";

export const TextToJsonPrompt: Prompt<{ text: string }, z.ZodSchema> = (
  input,
  schema
) => {
  return `
    <data>
        <text>
        ${input.text}
        </text>
        <parsing-schema>
        ${JSON.stringify(zodToJsonSchema(schema, { target: "openAi" }))}
        </parsing-schema>
    </data>
    <instructions>
        You are a helpful assistant that parses text into JSON objects.
        Analyze the provided text and convert it into a JSON object defined by the schema.
        Return ONLY the raw JSON object without any markdown formatting, code blocks, or additional text.
        Do not include \`\`\`json, \`\`\`, or any other formatting characters.
    </instructions>
  `;
};

export const getParseTextToJsonFunction = <OutputSchema extends z.ZodSchema>(
  schema: OutputSchema
) =>
  getCompletionFunction<{ text: string }, z.infer<OutputSchema>>(
    TextToJsonPrompt,
    schema
  );
