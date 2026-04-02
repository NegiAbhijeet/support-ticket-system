import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export const AuthController = {
  register: async (req: Request, res: Response, next: NextFunction) => {

    console.log("inside auth controller")

    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
      }

      const result = await AuthService.register({ name, email, password });
      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
      }

      const result = await AuthService.login({ email, password });
      console.log("setting cookies")
      // ✅ Set token in cookie
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: false,     // localhost
        sameSite: 'lax',   // ✅ now works
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      next(err);
    }
  }

};
