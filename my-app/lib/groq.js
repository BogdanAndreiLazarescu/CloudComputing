import OpenAI from 'openai';

const apiKey = process.env.XAI_API_KEY;

if (!apiKey) {
  throw new Error("Please define XAI_API_KEY in your environment variables");
}

const groq = new OpenAI({
  apiKey,
  baseURL: 'https://api.groq.com/openai/v1',
});

export default groq;