import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()

app.use(helmet())
app.use(morgan('dev'))

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Server running'})
})

app.use((req, res) => {
  res.status(404).json({ message: 'Invalid Route'})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running at ${PORT}`))