import { Request, Response } from "express";
import { createApplication, getApplications, getApplication } from "../services/application.service.js";

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

export async function getOne(req: Request, res: Response){
  const userId = req.user!.userId
  const { id } = req.params
  const application = await getApplication(id as string, userId)
  res.json(application)
}