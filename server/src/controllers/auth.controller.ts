import { Request, Response } from 'express';
import { findUser, loginUser, registerUser } from '../services/auth.service.js';

export async function register(req: Request, res: Response) {
  const { token, user } = await registerUser(req.body);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 60 * 1000,
    path: '/',
  });

  res.status(201).json({
    status: 'success',
    user,
  });
}

export async function login(req: Request, res: Response) {
  const { token, user } = await loginUser(req.body);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 60 * 1000,
    path: '/',
  });

  res.json({
    status: 'success',
    user,
  });
}

export async function getUser(req: Request, res: Response) {
  const userId = req.user!.userId;
  const user = await findUser(userId);

  res.json(user);
}
