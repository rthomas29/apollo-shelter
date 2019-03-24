import express from 'express'
import dotenv from 'dotenv'
import { start } from './server'
dotenv.config()
const app = express()
start(app)
