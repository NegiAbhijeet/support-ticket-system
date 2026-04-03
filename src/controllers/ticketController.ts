import { Request, Response, NextFunction } from 'express';
import Ticket, { ITicket } from '../models/Ticket';
import { generateTicketAIFields } from '../services/aiService';
import mongoose from 'mongoose';

import { AuthRequest } from '../middleware/authGuard';

export const createTicket = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required.' });
    }
    // Call AI API (mocked)
    const aiFields = await generateTicketAIFields(title, description);
    const ticket = new Ticket({
      title,
      description,
      ...aiFields,
      user: req.user?.id,
    });
    await ticket.save();
    return res.status(201).json(ticket);
  } catch (err) {
    next(err);
  }
};

export const getAllTickets = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const tickets = await Ticket.find({ user: req.user?.id }).sort({ createdAt: -1 });
    return res.status(200).json(tickets);
  } catch (err) {
    next(err);
  }
};

export const getTicketById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { id } = req.params;
    // Ensure id is a string for Mongoose
    if (Array.isArray(id)) {
      id = id[0];
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found.' });
    }
    return res.status(200).json(ticket);
  } catch (err) {
    next(err);
  }
};
