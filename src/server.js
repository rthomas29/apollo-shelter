import { ApolloServer } from 'apollo-server'
import { merge } from 'lodash'
import connect from './db/index'
import config from './config'
import { loadTypeSchema } from './utils'
import animal from './types/animal/animal.resolvers'

const types = ['animal']

export const start = async () => {
  const rootSchema = `
    schema {
      query: Query,
      mutation: Mutation
    }
  `
  const schemaTypes = await Promise.all(types.map(loadTypeSchema))

  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers: merge({}, animal)
  })

  await connect(config.dbUrl)
  const { url } = await server.listen({ port: config.port })

  console.log(`🚀  GQL server ready at ${url}`)
}
