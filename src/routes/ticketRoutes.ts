import { Router } from 'express';
import { createTicket, getAllTickets, getTicketById } from '../controllers/ticketController';
import { authGuard } from '../middleware/authGuard';

const router = Router();

router.post('/tickets', authGuard, createTicket);
router.get('/tickets', authGuard, getAllTickets);
router.get('/tickets/:id', authGuard, getTicketById);

export default router;
