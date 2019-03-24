import dotenv from 'dotenv'
import connect from './db'
import config from './config'
import { ApolloServer, gql } from 'apollo-server-lambda'
import { merge } from 'lodash'
import { loadTypeSchema, authenticateUser } from './utils'
import animal from './types/animal/animal.resolvers'
import user from './types/user/user.resolvers'
import db from './db/crud'
dotenv.config()

export const getSchemaTypes = async types => {
  const schemas = await Promise.all(types.map(loadTypeSchema))
  return gql`schemas`
}

export const types = ['animal', 'user']

export const start = async () => {
  const rootSchema = gql`
  schema {
    query: Query,
    mutation: Mutation
  }
  `
  const schemaTypes = await getSchemaTypes(types)

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, animal, user),
    context: async ({ req }) => {
      const user = await authenticateUser(req)
      console.log('user?', user)
      return {
        user,
        db
      }
    }
  })

  try {
    await connect()
  } catch (error) {
    throw new Error(`Error connecting to mongoose: ${error}`)
  }

  console.log(`🚀  GQL server ready at ${config.port}${server.graphqlPath}`)
  exports.handler = server.createHandler({
    cors: {
      origin: '*',
      credentials: true,
    },
  })
}

start()
