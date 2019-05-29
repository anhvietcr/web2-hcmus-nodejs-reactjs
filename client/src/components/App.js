import React from 'react';
import './App.css';
import Home from '../containers/Home'
import User from '../containers/User';
import HomeCpanel from './cpanel/Home';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Book from './Book';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/booking_movie/:id" component={Book} />
          <Route path="/user" component={User} />
          <Route path="/cpanel" component={HomeCpanel} />
          <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
