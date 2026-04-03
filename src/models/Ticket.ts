import { Schema, model, Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  summary: string;
  category: 'billing' | 'technical' | 'account' | string;
  tags: string[];
  suggestedResponse: string;
  createdAt: Date;
}


const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  suggestedResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model<ITicket>('Ticket', ticketSchema);
