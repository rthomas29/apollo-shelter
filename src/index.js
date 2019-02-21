import express from 'express'
import { start } from './server'

const app = express()

app.get('/', (req, res) => {
  res.send({ message: 'hello world' })
})
start(app)
