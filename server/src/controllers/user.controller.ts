import { Request, Response } from 'express';
import {
  getUserProfileData,
  updateProfileData,
  updateProfileImage,
} from '../services/user.service.js';
import ApiError from '../utils/ApiError.js';

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

export async function updateImage(req: Request, res: Response) {
  const userid = req.user!.userId;
  if (!req.file) {
    throw new ApiError(400, 'No file uploaded');
  }
  const user = await updateProfileImage(userid, req.file.buffer);
  res.json(user);
}
