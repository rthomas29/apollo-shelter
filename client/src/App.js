import React, { Component } from 'react'
import gql from 'graphql-tag'
import { ApolloProvider, Query } from 'react-apollo'
import client from './apolloConfig'
import AnimalRoster from './components/AnimalRoster'
import './App.css'

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
              return <AnimalRoster animals={data.animals} />
            }}
          </Query>
        </div>
      </ApolloProvider>
    )
  }
}

export default App
