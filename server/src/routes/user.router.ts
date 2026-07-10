import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getProfile, updateProfile } from '../controllers/user.controller.js';
import { validateRequest } from '../middlewares/request.middleware.js';
import { UpdateProfileSchema } from '../schema/user.schema.js';

export const userRouter = express.Router();

userRouter.get('/profile', authenticate, getProfile);
userRouter.patch(
  '/profile',
  authenticate,
  validateRequest(UpdateProfileSchema),
  updateProfile,
);
