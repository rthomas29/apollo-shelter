import connect from './db'
import config from './config'
import { ApolloServer } from 'apollo-server-express'
import { merge } from 'lodash'
import { loadTypeSchema, authenticateUser } from './utils'
import animal from './types/animal/animal.resolvers'
import user from './types/user/user.resolvers'
import db from './db/crud'

export const getSchemaTypes = async types => {
  const schemas = await Promise.all(types.map(loadTypeSchema))
  return schemas
}

export const types = ['animal', 'user']

export const start = async app => {
  const rootSchema = `
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
      return { user, db }
    }
  })

  try {
    await connect()
  } catch (error) {
    throw new Error(`Error connecting to mongoose: ${error}`)
  }

  server.applyMiddleware({ app })
  await app.listen({ port: config.port })
  console.log(`🚀  GQL server ready at ${config.port}${server.graphqlPath}`)
}
