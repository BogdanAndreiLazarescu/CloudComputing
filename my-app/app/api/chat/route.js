import { NextResponse } from 'next/server';
import groq from '@/lib/groq';

const SYSTEM_PROMPTS = {
  SIMPLE_ASSISTANT: {
    MESSAGE: {
      role: 'system',
      content: 'You are a simple assistant. You respond with simple sentences.',
    },
    TEMPERATURE: 1,
    MAX_TOKENS: 50,
    TYPE: 'simple_assistant',
  },
  USER: {
    MESSAGE: {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
    TEMPERATURE: 1,
    MAX_TOKENS: 100,
    TYPE: 'user',
  },
};

const chatCompletion = async (messagesArray, max_tokens, temperature) => {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-8b-instant',
    messages: messagesArray,
    max_tokens,
    temperature,
  });
  return response?.choices[0];
};

const converseChat = async (inputChat, useCase) => {
  const MAX_MEMORY = 3;
  const userMessagesArray = inputChat.length > MAX_MEMORY
    ? inputChat.slice(-MAX_MEMORY)
    : inputChat;

  const messagesArray = [useCase.MESSAGE, ...userMessagesArray];
  const response = await chatCompletion(messagesArray, useCase.MAX_TOKENS, useCase.TEMPERATURE);
  return response;
};

export async function POST(request) {
  try {
    const { messages, type } = await request.json();

    if (!messages) {
      return NextResponse.json({ error: 'Missing messages' }, { status: 400 });
    }

    const useCase = type === 'simple_assistant'
      ? SYSTEM_PROMPTS.SIMPLE_ASSISTANT
      : SYSTEM_PROMPTS.USER;

    const response = await converseChat(messages, useCase);

    return NextResponse.json({
      message: {
        role: 'assistant',
        content: response.message.content,
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error processing request' }, { status: 500 });
  }
}