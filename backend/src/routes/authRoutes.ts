import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authGuard, AuthRequest } from '../middleware/authGuard';

const router = Router();

// Public routes
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

// Protected route example
router.get('/me', authGuard, (req: AuthRequest, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

export default router;
