import { Request, Response, NextFunction } from 'express';
import Ticket, { ITicket } from '../models/Ticket';
import { generateTicketAIFields } from '../services/aiService';
import mongoose from 'mongoose';
import { AuthRequest } from '../middleware/authGuard';

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required.' });
      return;
    }
    try {
      const aiFields = await generateTicketAIFields(title, description);
      const ticket = new Ticket({
        title,
        description,
        ...aiFields,
        user: req.user?.id,
      });
      await ticket.save();
      res.status(201).json(ticket);
      return;
    } catch (aiErr: any) {
      res.status(503).json({ message: 'AI enrichment failed', details: aiErr?.message || aiErr });
      return;
    }
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to create ticket', details: err?.message || err });
    return;
  }
};




export const getAllTickets = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tickets = await Ticket.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json(tickets);
    return;
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch tickets', details: err?.message || err });
    return;
  }
};

export const getTicketById = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    let { id } = req.params;
    if (Array.isArray(id)) {
      id = id[0];
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ message: 'Ticket not found.' });
      return;
    }
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      res.status(404).json({ message: 'Ticket not found.' });
      return;
    }
    res.status(200).json(ticket);
    return;
  } catch (err: any) {
    res.status(500).json({ message: 'Failed to fetch ticket', details: err?.message || err });
    return;
  }
};
