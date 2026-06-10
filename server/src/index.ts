import express, { Request, Response, NextFunction } from 'express'
import ApiError from './utils/ApiError.js'
import { connectDB } from './config/db.js'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { authRouter } from './routes/auth.router.js'
import { errors } from 'jose'
import { applicationRouter } from './routes/application.router.js'
import { authenticate } from './middlewares/auth.middleware.js'
import { applicationLimiter, applicationThrottle } from './middlewares/rateLimiter.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'

const environment = process.env.NODE_ENV || 'development'
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${environment}`)
})

const app = express()

mongoose.set('sanitizeFilter', true)

app.use(helmet())
app.use(morgan('dev'))

app.use(cors())

app.use(express.json({ limit: '20kb' }))

await connectDB()

app.use('/auth', authRouter)
app.use('/applications', authenticate, applicationThrottle, applicationLimiter, applicationRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid Route'})
})

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof errors.JOSEError){
    return res.status(401).json({ message: 'Invalid or token expired' })
  }
  const apiErr = err as ApiError
  const status = apiErr.statusCode || 500
  const message = apiErr.isOperational ? apiErr.message : 'Internal server error'
  if(status === 500) console.error(err)
  res.status(status).json({ message })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))