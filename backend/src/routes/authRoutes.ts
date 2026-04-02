import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authGuard, AuthRequest } from '../middleware/authGuard';

const router = Router();
console.log("inside app routes")
// Public routes

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);


router.get('/me', authGuard, (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  return res.status(200).json({
    success: true,
    data: req.user,
  });
});
export default router;
