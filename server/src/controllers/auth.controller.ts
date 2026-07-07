import { Request, Response } from 'express';
import {
  findUser,
  getUserProfileData,
  loginUser,
  registerUser,
} from '../services/auth.service.js';

export async function register(req: Request, res: Response) {
  const { token, user } = await registerUser(req.body);

  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 24 * 60 * 60 * 1000,
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
    maxAge: process.env.NODE_ENV === 'production' ? 15 * 60 * 1000 : 24 * 60 * 60 * 1000,
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

export function logout(_req: Request, res: Response) {
  res.cookie('access_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 0,
    path: '/',
    expires: new Date(0),
  });

  res.json({ message: 'Logged out successfully' });
}

export async function getProfile(req: Request, res: Response) {
  const userId = req.user?.userId;
  const profile = await getUserProfileData(userId as string);
  res.json(profile);
}
