import express from 'express';
import {
  create,
  getAll,
  getOne,
  deleteOne,
  updateOne,
} from '../controllers/application.controller.js';
import { validateRequest, validateId } from '../middlewares/auth.middleware.js';
import {
  ApplicationSchema,
  UpdateApplicationSchema,
} from '../schema/application.schema.js';

export const applicationRouter = express.Router();

applicationRouter.get('/', getAll);
applicationRouter.post('/', validateRequest(ApplicationSchema), create);
applicationRouter.get('/:id', validateId, getOne);
applicationRouter.patch(
  '/:id',
  validateId,
  validateRequest(UpdateApplicationSchema),
  updateOne,
);
applicationRouter.delete('/:id', validateId, deleteOne);
