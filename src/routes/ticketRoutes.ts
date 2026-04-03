import { Router } from 'express';
import { createTicket, getAllTickets, getTicketById } from '../controllers/ticketController';

const router = Router();

router.post('/tickets', createTicket);
router.get('/tickets', getAllTickets);
router.get('/tickets/:id', getTicketById);

export default router;
