import express from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import {
  getProfile,
  updateImage,
  updateProfile,
} from '../controllers/user.controller.js';
import { validateRequest } from '../middlewares/request.middleware.js';
import { UpdateProfileSchema } from '../schema/user.schema.js';
import { uploadImage } from '../middlewares/upload.middleware.js';

export const userRouter = express.Router();

userRouter.get('/profile', authenticate, getProfile);
userRouter.patch(
  '/profile',
  authenticate,
  validateRequest(UpdateProfileSchema),
  updateProfile,
);
userRouter.patch('/image', authenticate, uploadImage, updateImage);
