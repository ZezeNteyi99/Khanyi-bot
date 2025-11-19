import { GoogleGenAI, Chat, Content } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Message } from "../types";

// Initialize API with environment variable
const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

// Keep track of the chat instance
let chatSession: Chat | null = null;

export const initializeChat = () => {
  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });
};

export const sendMessageStream = async (
  text: string,
  history: Message[]
): Promise<AsyncIterable<string>> => {
  if (!chatSession) {
    initializeChat();
  }

  // We don't need to manually pass history here because ai.chats.create maintains it.
  // However, if we were stateless, we would map history to Content objects.
  // For this app, we rely on the SDK's internal session state.

  try {
    // @ts-ignore: The SDK types are strict, but sendMessageStream returns an async iterable
    const result = await chatSession!.sendMessageStream({ message: text });
    
    // Create a generator to yield text chunks
    async function* streamGenerator() {
      for await (const chunk of result) {
         // Safely extract text
         const chunkText = chunk.text || "";
         yield chunkText;
      }
    }

    return streamGenerator();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

// Helper to determine topic based on text content (simple client-side heuristic)
// In a production app, we might ask the LLM to classify this in a separate call or JSON mode.
export const detectTopic = (text: string): string | null => {
  const lower = text.toLowerCase();
  if (lower.includes('vs') && (lower.includes('ml') || lower.includes('machine learning'))) return 'AI_VS_ML';
  if (lower.includes('neural') || lower.includes('network') || lower.includes('deep learning')) return 'NEURAL_NETWORKS';
  if (lower.includes('nlp') || lower.includes('language') || lower.includes('text')) return 'NLP';
  if (lower.includes('ethic') || lower.includes('bias') || lower.includes('job') || lower.includes('privacy')) return 'ETHICS';
  if (lower.includes('vision') || lower.includes('image')) return 'CV';
  return null;
};