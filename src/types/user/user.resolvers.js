export const signIn = async (_, { input }, { token, db }) => {
  try {
    const newUser = await db.findUserByEmail(input)
    if (!newUser) throw new Error('Invalid user')
    console.log(`User is authenticated!: ${JSON.stringify(newUser, null, 2)}`)
    return { ...newUser, token }
  } catch (error) {
    return `Error signing in: ${error.message}`
  }
}
export default {
  Mutation: {
    signIn
  },
  Token: {
    token(token) {
      return token
    }
  }
}
