import React from 'react';
import './App.css';
import Home from '../containers/Home'
import Logout from './auth/Logout'
import User from '../containers/User';
import ForgotPassword from '../containers/auth/ForgotPassword';
import HomeCpanel from './cpanel/Home';
import MovieSearch from '../containers/MovieSearch';
import MovieDetail from '../containers/MovieDetail';
import Login from '../containers/auth/Login';
import Register from '../containers/auth/Register';
import Pending from '../containers/auth/Pending';
import Ticket from '../containers/Ticket';
import Theater from '../containers/Theater';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/auth/verify/:code" component={Pending} />
          <Route path="/auth/forgot-password/:code" component={ForgotPassword} />
          <Route path="/movie/detail/:id" component={MovieDetail} />
          <Route path="/ticket/:id" component={Ticket} />

          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/auth/logout" component={Logout} />
          <Route path="/auth/pending" component={Pending} />
          <Route path="/auth/forgot-password" component={ForgotPassword} />
          <Route path="/user" component={User} />
          <Route path="/cpanel" component={HomeCpanel} />
          <Route path="/theater" component={Theater} />
          <Route path="/movie/search" component={MovieSearch} />
          <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
