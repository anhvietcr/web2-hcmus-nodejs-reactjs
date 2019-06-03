import React from 'react';
import './App.css';
import Home from '../containers/Home'
import User from '../containers/User';
import HomeCpanel from './cpanel/Home';
import Login from '../containers/auth/Login';
import Movie from '../containers/Movie';
import Register from '../containers/auth/Register';
import Book from './Book';
import Theater from '../containers/Theater';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/ticket/:id" component={Book} />
          <Route path="/user" component={User} />
          <Route path="/cpanel" component={HomeCpanel} />
          <Route path="/theater" component={Theater} />
          <Route path="/movie/search" component={Movie} />
          <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
