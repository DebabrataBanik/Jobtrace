import { Request, Response } from "express";
import { createApplication, getApplications } from "../services/application.service.js";

export async function getAll(req: Request, res: Response){
  const userId = req.user!.userId
  const applications = await getApplications(userId)
  res.json(applications)
}

export async function create(req: Request, res: Response){
  const userId = req.user!.userId
  const application = await createApplication(req.body, userId)
  res.status(201).json(application)
}