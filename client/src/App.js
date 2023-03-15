import logo from './logo.svg';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import './App.css';

import Nav from './components/Nav';
import Home from './Pages/Home'
import Dashboard from './Pages/Dashboard'
import Groups from './Pages/Groups'
import LoginForm from './components/LoginForm'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <>
    <ApolloProvider client={client}> 
            <Nav />
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/dashboard" element={<Dashboard />}/>
              <Route path="/groups" element={<Groups />}/>
            </Routes>
    </ApolloProvider>
    </>

  );
}

export default App;
