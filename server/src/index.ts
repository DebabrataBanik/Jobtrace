import express, { Request, Response, NextFunction } from 'express'
import ApiError from './utils/ApiError.js'
import { connectDB } from './config/db.js'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'
import { authRouter } from './routes/auth.router.js'

const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(cors())

app.use(express.json())

await connectDB()

app.use('/auth', authRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid Route'})
})

app.use((err: ApiError , req: Request, res: Response, next: NextFunction) => {
  const status = err.statusCode || 500
  const message = err.isOperational ? err.message : 'Internal server error'
  if(status === 500) console.error(err)
  res.status(status).json({ message })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`))