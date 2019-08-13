import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { HttpLink } from 'apollo-link-http'; 
import { setContext } from 'apollo-link-context';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';
import Users from "./views/Users/Users"

// import Users from "./views/Users/Users"


// import * as serviceWorker from './serviceWorker';
           

const httpLink = new HttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const cache = new InMemoryCache();


const stateLink = withClientState({
  cache,
  resolvers: {
    Mutation: {
      login: (_, { type }) => {
        const data = {
          isConnect: true,
          type,
        };
        cache.writeData({ data });
        return cache;
      },
    },
  },
  defaults: {
    isConnect: false,
  },
});

export default stateLink;

const link = ApolloLink.from([stateLink, httpLink]);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
});




ReactDOM.render(<ApolloProvider client={client}>
  <App /> 
</ApolloProvider>, document.getElementById('root'));
