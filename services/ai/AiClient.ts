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

export default getAiClient;
