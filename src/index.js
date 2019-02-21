import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import register from './routes/register'
import { start } from './server'
dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/register', register)
start(app)
