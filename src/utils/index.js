import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
import cuid from 'cuid'
import { AuthenticationError } from 'apollo-server'
import db from '../db/crud'
import { ERRORS } from '../utils/constants'

export const loadTypeSchema = type =>
  new Promise((resolve, reject) => {
    const pathToSchema = path.join(process.cwd(), `src/types/${type}/${type}.gql`)
    fs.readFile(pathToSchema, { encoding: 'utf-8' }, (err, schema) => {
      if (err) {
        return reject(err)
      }

      resolve(schema)
    })
  })

export const getUser = token => {
  return new Promise(async (res, rej) => {
    try {
      let user = null
      console.log('...token', token)
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decoded', decoded)
        user = await getAuthenticatedUser(decoded)
        res(user)
      }
    } catch (error) {
      console.log('error', error)
      rej(error)
    }
  })
}

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user
  return await jwt.sign({ id, email, username }, secret, { expiresIn })
}

export const createApiKey = () => cuid()

export const authenticateUser = async (req) => {
  // attempt to grab apiKey from request headers
  const apiKey = req.headers.authorization
  if (!apiKey) return null

  // find user in db based on apiKey
  const user = await User.findOne({ apiKey })
    .select('-password')
    .lean()
    .exec()
  return user
}