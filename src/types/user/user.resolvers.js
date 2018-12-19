import db from '../../db/crud'

export const createUser = async (_, args) => await db.createUser(args.input)

export default {
  Mutation: {
    createUser
  },
  User: {
    email(user) {
      return user.email
    }
  }
}
