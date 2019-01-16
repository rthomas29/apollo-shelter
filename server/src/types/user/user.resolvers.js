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
    const token = { token: createToken(newUser, secret, '30m') }
    return token
  } catch (error) {
    return 'Error registering user'
  }
}
export default {
  Mutation: {
    createUser,
    registerUser
  }
}
