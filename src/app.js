import express from 'express'
import { PORT } from './config.js'
import { getUsers } from './db/pool.js'
const app = express()

app.get('/', async (req, res) => {
  const response = await getUsers()
  console.log(response)
  res.json(response)
})

app.listen(PORT)
console.log('Server on port', PORT)
