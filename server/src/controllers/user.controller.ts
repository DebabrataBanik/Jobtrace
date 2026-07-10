import { Request, Response } from 'express';
import { getUserProfileData, updateProfileData } from '../services/user.service.js';

export async function getProfile(req: Request, res: Response) {
  const userId = req.user!.userId;
  const user = await getUserProfileData(userId);
  res.json(user);
}

export async function updateProfile(req: Request, res: Response) {
  const userId = req.user!.userId;
  const user = await updateProfileData(userId, req.body);
  res.json(user);
}
