import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validateRequest } from '../middlewares/auth.middleware.js'
import { LoginSchema, RegisterSchema } from '../schema/auth.schema.js'

export const authRouter = express.Router()

authRouter.post('/register', validateRequest(RegisterSchema), register)
authRouter.post('/login', validateRequest(LoginSchema), login)