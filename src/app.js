import bodyParser from 'body-parser'
import express from 'express'
import { PORT } from './config.js'
import { pool } from './db/pool.js'
import cors from 'cors'
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Welcome to Nasa-Calendar Api!')
})

app.get('/api/comments', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM comments')
    console.log(rows)
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/comments', async (req, res) => {
  try {
    const query = 'INSERT INTO comments (comment) VALUES ($1)'
    console.log(req.body)
    if (!req.body || !req.body.comment) {
      return res.json({
        error: 'Comment is empty'
      })
    }
    const { comment } = req.body
    await pool.query(query, [comment])
    res.status(201).json({ message: 'Comment added successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(PORT)
console.log('Server on port', PORT)
