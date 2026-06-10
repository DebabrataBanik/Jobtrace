import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validateRequest } from '../middlewares/auth.middleware.js';
import { LoginSchema, RegisterSchema } from '../schema/auth.schema.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

export const authRouter = express.Router();

authRouter.post('/register', authLimiter, validateRequest(RegisterSchema), register);
authRouter.post('/login', authLimiter, validateRequest(LoginSchema), login);
