import express from 'express'
import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { start } from './server'

const app = express()
// app.use(bodyParser.urlencoded({ extended: false }))

// app.post('/login', (req, res) => {
//   const { username, password } = req.body
// })

// const { jwtSecret } = config
// const users = [
//   {
//     id: 1,
//     name: 'John',
//     email: 'john@mail.com',
//     password: 'john123'
//   }
// ]

// // generate a jwt token for testing purposes
// console.log('JWT!', jwt.sign(users[0], jwtSecret))

start(app)
