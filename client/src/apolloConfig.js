import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: 'http://localhost:8080'
})

const client = new ApolloClient({
  link: httpLink,
  cache
})

export default client
