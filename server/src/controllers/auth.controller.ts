import { Request, Response } from "express"
import { registerUser } from "../services/auth.service.js"

export async function register(req: Request, res: Response){
  const result = await registerUser(req.body)
  res.status(201).json({
    status: 'success',
    ...result
  })
}

export async function login(req: Request, res: Response){
  res.json({ message: 'Login isnt setup yet!'})
}