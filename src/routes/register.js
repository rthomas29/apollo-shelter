import express from 'express'
import db from '../db/crud'
import { createToken } from '../utils/index'
const router = express.Router()

router.post('/register', async (req, res, next) => {
  // register users here and save to db
  // generate jwt that will authenticate users for /graphql
  try {
    const { email, password, role } = req.body
    if (!email) throw new Error('Missing email address')
    if (!password) throw new Error('Password is required')
    if (!role) throw new Error('Missing user role')
    const user = await db.createUser({ email, password, role })
    const token = await createToken(user, process.env.JWT_SECRET, '1y')
    res.send({ token })
  } catch (error) {
    res.send(`Error: ${error.message}`)
  }
})

export default router
