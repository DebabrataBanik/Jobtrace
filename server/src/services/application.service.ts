import { Application } from '../models/application.model.js';
import {
  ApplicationInput,
  UpdateApplicationInput,
} from '../schema/application.schema.js';
import ApiError from '../utils/ApiError.js';

export function getApplications(userId: string) {
  return Application.find({ userId }).sort({ createdAt: -1 });
}

export function createApplication(data: ApplicationInput, userId: string) {
  const { company, title, status, appliedDate, url, description, notes } = data;
  return Application.create({
    company,
    title,
    status,
    appliedDate,
    url,
    description,
    notes,
    timeline: [{ status, date: appliedDate }],
    userId,
  });
}

export async function getApplication(id: string, userId: string) {
  const document = await Application.findOne({ _id: id, userId });
  if (!document) {
    throw new ApiError(404, 'Application not found');
  }
  return document;
}

const TERMINAL_STATES = ['Offer', 'Rejected'];

export async function updateApplication(
  id: string,
  userId: string,
  data: UpdateApplicationInput,
) {
  const document = await Application.findOne({ _id: id, userId });
  if (!document) {
    throw new ApiError(404, 'Application not found');
  }

  const { status } = data;

  if (status) {
    if (status === 'Applied') {
      throw new ApiError(400, 'Applied status can only be set once on creation');
    }
    if (TERMINAL_STATES.includes(document.status)) {
      throw new ApiError(400, 'Application is already closed');
    }
  }

  return Application.findOneAndUpdate(
    { _id: id, userId },
    {
      $set: data,
      ...(status && { $push: { timeline: { status, date: new Date() } } }),
    },
    { returnDocument: 'after', runValidators: true },
  );
}

export async function deleteApplication(id: string, userId: string) {
  const result = await Application.deleteOne({ _id: id, userId });
  if (result.deletedCount === 0) {
    throw new ApiError(404, 'Application not found');
  }
}
