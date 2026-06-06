import { Application } from "../models/application.model.js"
import { ApplicationInput } from "../schema/application.schema.js"

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