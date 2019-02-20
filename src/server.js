import { ApolloServer } from 'apollo-server-express'
import { merge } from 'lodash'
import connect from './db'
import config from './config'
import { loadTypeSchema, getUser } from './utils'
import animal from './types/animal/animal.resolvers'
import user from './types/user/user.resolvers'

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
      const token = req.headers.authorization || ''
      const user = await getUser(token)
      return { secret: process.env.JWT_SECRET, user }
    }
  })

  try {
    await connect()
  } catch (error) {
    console.log(`Error connecting to mongoose: ${error}`)
  }

  server.applyMiddleware({ app })
  await app.listen({ port: config.port })
  console.log(`🚀  GQL server ready at ${config.port}${server.graphqlPath}`)
}
