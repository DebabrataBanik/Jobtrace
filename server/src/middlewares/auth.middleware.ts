import { Request, Response, NextFunction } from 'express'
import { z } from 'zod' 

export function validateAuthRequest(schema: z.ZodType){
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if(!result.success){
      const issues = result.error.issues.map(issue => ({
        name: issue.path[0]?.toString(),
        error: issue.message
      }))
      return res.status(400).json({ message: { type: 'ZodError', issues } })
    }
    req.body = result.data
    next()
  }
}