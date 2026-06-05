import { Request, Response } from "express";
import { createApplication } from "../services/application.service.js";

export async function create(req: Request, res: Response){
  const userId = req.user!.userId
  const application = await createApplication(req.body, userId)
  res.status(201).json(application)
}