// Mock AI Service for ticket enrichment
// Replace the mock implementation with a real AI API call (e.g., Google Gemini)
// and use process.env.AI_API_KEY for the API key.


export interface AITicketFields {
  summary: string;
  category: 'billing' | 'technical' | 'account' | string;
  tags: string[];
  suggestedResponse: string;
}


import { GoogleGenAI } from '@google/genai';


export async function generateTicketAIFields(title: string, description: string): Promise<AITicketFields> {
  const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('AI API key is not set in environment variables');
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are an AI assistant for a support ticket system. Given the following ticket details, extract the following:

1. summary: A short summary of the issue (max 12 words)
2. category: One of [billing, technical, account] (choose the best fit)
3. suggestedResponse: A suggested reply or troubleshooting step for the support agent
4. tags: 2-5 keywords/tags for searching/filtering (as a JSON array of strings)

Respond ONLY in the following JSON format:
{
  "summary": string,
  "category": string,
  "suggestedResponse": string,
  "tags": string[]
}

Ticket Title: ${title}
Ticket Description: ${description}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });
    const text = response.text;
    if (!text) throw new Error('No AI response');
    const parsed = JSON.parse(text);
    return {
      summary: parsed.summary,
      category: parsed.category,
      suggestedResponse: parsed.suggestedResponse,
      tags: parsed.tags,
    };
  } catch (err: any) {
    throw new Error('AI enrichment failed: ' + (err?.message || 'Unknown error'));
  }
}
