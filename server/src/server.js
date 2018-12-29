import { ApolloServer } from 'apollo-server'
import { merge } from 'lodash'
import connect from './db'
import config from './config'
import { loadTypeSchema } from './utils'
import animal from './types/animal/animal.resolvers'
import user from './types/user/user.resolvers'

export const getSchemaTypes = async types => {
  const schemas = await Promise.all(types.map(loadTypeSchema))
  return schemas
}

export const types = ['animal', 'user']

export const start = async () => {
  const rootSchema = `
    schema {
      query: Query,
      mutation: Mutation
    }
  `
  const schemaTypes = getSchemaTypes(types)
  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, animal, user)
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })
  console.log(`🚀  GQL server ready at ${url}`)
}
