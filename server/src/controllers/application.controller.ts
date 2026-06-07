import { Request, Response } from "express";
import { createApplication, getApplications, getApplication, deleteApplication, updateApplication } from "../services/application.service.js";

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

export async function updateOne(req: Request, res: Response){
  const userId = req.user!.userId
  const { id } = req.params
  console.log(req.body)
  const application = await updateApplication(id as string, userId, req.body)
  res.json(application)
}

export async function deleteOne(req: Request, res: Response){
  const userId = req.user!.userId
  const { id } = req.params
  await deleteApplication(id as string, userId)
  res.status(204).send()
}