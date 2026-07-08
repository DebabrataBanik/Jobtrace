import express from 'express';
import {
  login,
  register,
  getUser,
  logout,
  getProfile,
  updateProfile,
} from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/request.middleware.js';
import {
  LoginSchema,
  UpdateProfileSchema,
  RegisterSchema,
} from '../schema/auth.schema.js';
import { authLimiter } from '../middlewares/rateLimiter.js';
import { authenticate } from '../middlewares/auth.middleware.js';

export const authRouter = express.Router();

authRouter.get('/me', authenticate, getUser);
authRouter.get('/profile', authenticate, getProfile);
authRouter.patch(
  '/profile',
  authenticate,
  validateRequest(UpdateProfileSchema),
  updateProfile,
);
authRouter.post('/register', authLimiter, validateRequest(RegisterSchema), register);
authRouter.post('/login', authLimiter, validateRequest(LoginSchema), login);
authRouter.post('/logout', logout);
