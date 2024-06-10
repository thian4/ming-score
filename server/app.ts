import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { Score } from './model/score'

const app = express()

const hostname = '0.0.0.0'
const port = process.env.port || 3001

app.use(express.json())
app.use(cors())

const mongoUri = `mongodb+srv://ming:3QfqCjKYwmbd73H0@cluster0.rzxojv6.mongodb.net/`
mongoose
  .connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.post('/scores', async (req: Request, res: Response) => {
  const { id, name, score } = req.body

  if (id === undefined || name === undefined || score === undefined) {
    return res.status(400).json({ error: 'Invalid data' })
  }

  try {
    const newScore = new Score({ id, name, score })
    await newScore.save()
    res.status(201).json({ message: 'Score saved successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
})

app.get('/scores', async (req: Request, res: Response) => {
  try {
    const scores = await Score.find()
    res.status(200).json(scores)
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
})

app.get('/delete_all_scores', async (req: Request, res: Response) => {
  try {
    await Score.deleteMany({})
    res.status(200).json({ message: 'All scores deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Database error' })
  }
})

const parsedPort = parseInt(port as string, 10)

app.listen(parsedPort, hostname, () => {
  console.log(`Server running at http://${hostname}:${parsedPort}/`)
})
