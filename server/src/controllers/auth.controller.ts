import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service.js';

export async function register(req: Request, res: Response) {
  const result = await registerUser(req.body);
  res.status(201).json({
    status: 'success',
    ...result,
  });
}

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);
  res.json({
    status: 'success',
    ...result,
  });
}
