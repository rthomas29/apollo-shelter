import jwt from 'jsonwebtoken'
import db from '../../db/crud'

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user
  return await jwt.sign({ id, email, username }, secret, { expiresIn })
}

export const createUser = async (_, args) => await db.createUser(args.input)

export const registerUser = async (_, args, { secret }) => {
  try {
    const newUser = await db.createUser(args.input)
    const token = { token: createToken(newUser, secret, '1m') }
    return token
  } catch (error) {
    return 'Error registering user'
  }
}

export const signIn = async (_, args, { secret }) => {
  try {
    const user = await db.findUserByEmail(args.input)
    const token = { token: createToken(user, secret, '1m') }
    return token
  } catch (error) {
    return 'Error signing in'
  }
}
export default {
  Mutation: {
    createUser,
    registerUser,
    signIn
  }
}
