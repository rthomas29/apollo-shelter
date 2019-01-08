import React, { Component } from 'react'
import gql from 'graphql-tag'
import { ApolloClient } from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloProvider, Query } from 'react-apollo'
import './App.css'

const cache = new InMemoryCache()

const httpLink = new HttpLink({
  uri: 'http://localhost:8080'
})
const client = new ApolloClient({
  link: httpLink,
  cache
})

const GET_ANIMALS = gql`
  {
    animals {
      name
      color
      weight
    }
  }
`
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Query query={GET_ANIMALS}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...'
              if (error) return `Error! ${error.message}`
              return (
                <select name="dog">
                  {data.animals.map(animal => (
                    <option key={animal.createdAt} value={animal.name}>
                      {animal.name}
                    </option>
                  ))}
                </select>
              )
            }}
          </Query>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
