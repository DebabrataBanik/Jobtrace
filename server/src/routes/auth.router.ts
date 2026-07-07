import express from 'express';
import {
  login,
  register,
  getUser,
  logout,
  getProfile,
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/request.middleware.js';
import { LoginSchema, RegisterSchema } from '../schema/auth.schema.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const authRouter = express.Router();

authRouter.get('/me', authenticate, getUser);
authRouter.get('/profile', authenticate, getProfile);
authRouter.post('/register', authLimiter, validateRequest(RegisterSchema), register);
authRouter.post('/login', authLimiter, validateRequest(LoginSchema), login);
authRouter.post('/logout', logout);
