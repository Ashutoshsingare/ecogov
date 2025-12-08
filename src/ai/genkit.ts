import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

export const ai = genkit({
  plugins: [googleAI()],
  // recommended stable model id
  model: "googleai/gemini-2.5-flash",
});
