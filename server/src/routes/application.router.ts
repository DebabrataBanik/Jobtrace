import express from 'express'
import { create, getAll } from '../controllers/application.controller.js'
import { validateRequest } from '../middlewares/auth.middleware.js'
import { ApplicationSchema } from '../schema/application.schema.js'

export const applicationRouter = express.Router()

applicationRouter.get('/', getAll)
applicationRouter.post('/', validateRequest(ApplicationSchema), create)