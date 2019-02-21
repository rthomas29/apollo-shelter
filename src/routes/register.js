import express from 'express'
import db from '../db/crud'
import { createToken } from '../utils/index'
const router = express.Router()

router.post('/register', async (req, res) => {
  // register users here and save to db
  // generate jwt token that will authenticate users for /graphql
  if (!req.body) {
    throw new Error('no body')
  }
  const { email, password, role } = req.body
  try {
    const newUser = await db.createUser({ email, password, role })
    const token = await createToken(newUser, process.env.JWT_SECRET, '1 day')
    res.send({ token })
  } catch (error) {
    res.send({ error })
  }
})

export default router
