import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from '../config.js'
import pg from 'pg'
const { Pool } = pg

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT
})

export const getUsers = async () => {
  const res = await pool.query('SELECT * from comments')
  return res.rows
}
