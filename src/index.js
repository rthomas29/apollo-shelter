import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { start } from './server'
dotenv.config()

const app = express()
app.use(cors())
start(app)
