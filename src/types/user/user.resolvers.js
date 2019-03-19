import { UserInputError, AuthenticationError } from 'apollo-server'
import { createApiKey } from '../../utils'

export const signIn = async (_, { input }, { db, user }) => {
  try {
    if (!input) throw new UserInputError('Missing parameters')
    const user = await db.findUserByEmail({ email: input.email })
    console.log(`User is authenticated!: ${JSON.stringify(user, null, 2)}`)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const signUp = async (_, { input }, { db }) => {
  try {
    if (!input) throw new UserInputError('Missing parameters')
    const apiKey = createApiKey()
    const userPayload = { ...input, apiKey }
    const user = await db.createUser(userPayload)
    return user
  } catch (error) {
    throw new Error(error.message)
  }
}
export default {
  Mutation: {
    signIn,
    signUp
  }
}
