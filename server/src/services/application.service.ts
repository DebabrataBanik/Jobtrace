import { Application } from "../models/application.model.js"
import { ApplicationInput } from "../schema/application.schema.js"
import ApiError from "../utils/ApiError.js"

export function getApplications(userId: string){
  return Application.find({ userId }).sort({ createdAt: -1 })
}

export function createApplication(data: ApplicationInput, userId: string){
  const { company, title, status, appliedDate, url, description, notes } = data
  return Application.create({
    company,
    title,
    status,
    appliedDate, 
    url,
    description,
    notes,
    timeline: [{ status, date: appliedDate }],
    userId
  })
}

export async function getApplication(id: string, userId: string){
  const document = await Application.findOne({ _id: id, userId })
  if(!document){
    throw new ApiError(404, 'Application not found')
  }
  return document
}

export async function deleteApplication(id: string, userId: string){
  const result = await Application.deleteOne({ _id: id, userId })
  if(result.deletedCount === 0){
    throw new ApiError(404, 'Application not found')
  } 
}