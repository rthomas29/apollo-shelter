import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'
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
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        user = await getAuthenticatedUser(decoded)
        res(user)
      } else {
        throw new AuthenticationError(ERRORS.UNAUTHORIZED)
      }
    } catch (error) {
      rej(error)
    }
  })
}

export const getAuthenticatedUser = ({ email }) => {
  return new Promise(async (res, rej) => {
    try {
      const user = await db.findUserByEmail({ email })
      res(user)
    } catch (error) {
      rej(error)
    }
  })
}

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user
  return await jwt.sign({ id, email, username }, secret, { expiresIn })
}
