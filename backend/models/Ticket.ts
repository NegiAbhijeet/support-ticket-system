import { Schema, model, Document } from 'mongoose';

export interface ITicket extends Document {
  title: string;
  description: string;
  summary: string;
  category: 'billing' | 'technical' | 'account';
  tags: string[];
  createdAt: Date;
}

const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, enum: ['billing', 'technical', 'account'], required: true },
  tags: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<ITicket>('Ticket', ticketSchema);
