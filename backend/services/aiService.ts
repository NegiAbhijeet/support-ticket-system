// Mock AI Service for ticket enrichment
// Replace the mock implementation with a real AI API call (e.g., Google Gemini)
// and use process.env.AI_API_KEY for the API key.

export interface AITicketFields {
  summary: string;
  category: 'billing' | 'technical' | 'account';
  tags: string[];
}

export async function generateTicketAIFields(title: string, description: string): Promise<AITicketFields> {
  // TODO: Replace this mock with a real AI API call
  // Example: Use fetch or axios to call the AI API with the API key from process.env.AI_API_KEY
  // Example response below:
  return {
    summary: 'User is facing login issues.',
    category: 'account',
    tags: ['login', 'account', 'urgent'],
  };
}
