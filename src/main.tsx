import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import './styles/index.css'

import { ChakraProvider } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client'

import { client } from './config/apollo'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
