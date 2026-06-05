import express from 'express'
import { login, register } from '../controllers/auth.controller.js'
import { validateAuthRequest } from '../middlewares/auth.middleware.js'
import { RegisterSchema } from '../schema/user.schema.js'

export const authRouter = express.Router()

authRouter.post('/register', validateAuthRequest(RegisterSchema), register)
