import React from 'react';
import{ApolloProvider, ApolloClient, InMemoryCache, createHttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

//sets things up to send a graphql operation to an endpoint over http.
const httpLink = createHttpLink({
  uri: '/graphql',
});
//sets things up to be used for authenttication.
const authLink= setContext((_,{headers})=>{
  const token=localStorage.getItem('id_token');
  return{
    headers:{
      ...headers,
      authorization: token? `Bearer ${token}` : '',
    }
  };
});
//uses the previous two set ups by calling a new instance of ApolloClient.
const client= new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
