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

export const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user
  return await jwt.sign({ id, email, username }, secret, { expiresIn })
}

export const getSchemaTypes = async (types = ['animal', 'user']) => {
  const schemas = await Promise.all(types.map(loadTypeSchema))
  return schemas
}

export const createApiKey = () => cuid()

export const authenticateUser = async (req) => {
  // attempt to grab apiKey from request headers
  const apiKey = req.headers.authorization
  if (!apiKey) return null

  console.log('apiKey', apiKey)
  // find user in db based on apiKey
  return db.findUserByApiKey(apiKey)
}