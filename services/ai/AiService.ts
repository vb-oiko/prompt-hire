import { z } from "zod";

const MODEL = "gpt-4o";

import OpenAI from "openai";
import { OPENAI_API_KEY } from "../../const";

let client: OpenAI | null = null;

if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set");
}

function getAiClient() {
  if (!client) {
    client = new OpenAI({
      apiKey: OPENAI_API_KEY,
    });
  }
  return client;
}

export function getCompletionFunction<Input, Output>(
  prompt: Prompt<Input>,
  outputSchema: z.ZodSchema<Output>
) {
  return async (input: Input) => {
    const response = await getAiClient().responses.create({
      model: MODEL,
      input: prompt(input),
    });

    const outputText = response.output_text;

    if (!outputText) {
      throw new Error("Empty response");
    }

    try {
      const output = JSON.parse(outputText);
      const result = outputSchema.parse(output);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(`Invalid response from AI: ${outputText}`);
    }
  };
}

export type Prompt<Input> = (input: Input) => string;
