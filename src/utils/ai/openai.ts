import OpenAI from "openai";
import { ChatOpenAI } from "@langchain/openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

export const client = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true,
});

export const conversationalModel = new ChatOpenAI({
  temperature: 0,
  apiKey,
  model: "gpt-4o-mini",
});
