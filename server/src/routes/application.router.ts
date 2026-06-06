import express from 'express'
import { create, getAll, getOne } from '../controllers/application.controller.js'
import { validateRequest, validateId } from '../middlewares/auth.middleware.js'
import { ApplicationSchema } from '../schema/application.schema.js'

export const applicationRouter = express.Router()

applicationRouter.get('/', getAll)
applicationRouter.post('/', validateRequest(ApplicationSchema), create)
applicationRouter.get('/:id', validateId, getOne)