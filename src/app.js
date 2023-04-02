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
  const { imageId } = req.query
  try {
    const { rows } = await pool.query('SELECT * FROM comments WHERE image_id = $1', [imageId])
    res.status(200).json(rows)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/comments', async (req, res) => {
  try {
    const query = 'INSERT INTO comments (comment, image_Id, created_at) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *'
    if (!req.body || !req.body.comment) {
      return res.status(400).json({
        error: 'Comment is empty'
      })
    }
    const { comment, imageId } = req.body
    const result = await pool.query(query, [comment, imageId])
    res.status(201).json({ commentPosted: result.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.listen(PORT)
console.log('Server on port', PORT)
