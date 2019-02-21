import jwt from 'jsonwebtoken'
import db from '../../db/crud'

const createToken = async (user, secret, expiresIn) => {
  const { id, email, username } = user
  return await jwt.sign({ id, email, username }, secret, { expiresIn })
}

export const signIn = async (_, args, { secret }) => {
  try {
    const user = await db.findUserByEmail(args.input)
    const token = { token: createToken(user, secret, '1 day') }
    return token
  } catch (error) {
    return 'Error signing in'
  }
}
export default {
  Mutation: {
    signIn
  }
}
