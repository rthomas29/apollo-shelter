const { ApolloServer } = require('apollo-server')
const { merge } = require('lodash')
const connect = require('./db/index')
const config = require('./config')
const loadTypeSchema = require('./utils')
const animal = require('./types/animal/animal.resolvers')

const types = ['animal']

const start = async () => {
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

module.exports = start
