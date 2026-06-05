import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validateAuthRequest } from '../middlewares/auth.middleware.js'
import { LoginSchema, RegisterSchema } from '../schema/auth.schema.js'

export const authRouter = express.Router()

authRouter.post('/register', validateAuthRequest(RegisterSchema), register)
authRouter.post('/login', validateAuthRequest(LoginSchema), login)