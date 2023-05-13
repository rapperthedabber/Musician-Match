import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from "@apollo/client/link/ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { concat } from 'apollo-link';
import { SubscriptionClient } from "subscriptions-transport-ws";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';
import TinderCards from './components/TinderCards'
import Chat from './pages/Chat'
import ChatRoom from './components/Chat/ChatRoom'
import auth from './utils/auth';

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

/* 
const wsLink = new GraphQLWsLink(
  createClient({
    url: "ws://localhost:3001/graphql",
    options: {
      reconnect: true // Enable automatic reconnection in case of disconnection
    },
  }),
); */

const wsLink = () =>
  new WebSocketLink(
    new SubscriptionClient("ws://localhost:3001/graphql", {
      reconnect: true,
    })
  );

const terminatingLink = concat(authLink, httpLink, wsLink);

const client = new ApolloClient({
  //link: authLink.concat(httpLink).concat(wsLink),
  link: terminatingLink,
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<TinderCards />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              
              <Route 
                path="/me" 
                element={<Profile />} 
              />
              <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              />
              <Route 
              path ="/chat"
              element = {<Chat/>}/>
               <Route 
              path ="/chat/:chatRoomId"
              element = {<ChatRoom/>}/>
              {/* <Route
              path='/seeMatch'
              element ={<TinderCards/>}/> */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
