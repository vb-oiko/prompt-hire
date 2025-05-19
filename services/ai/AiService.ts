import getAiClient from "./AiClient";
import { z } from "zod";

const MODEL = "gpt-4o-mini";

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
