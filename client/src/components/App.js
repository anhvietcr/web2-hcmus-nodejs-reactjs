import React from 'react';
import './App.css';
import Home from '../containers/Home'
import User from './User';
import HomeCpanel from './cpanel/Home';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/user" component={User} />
          <Route path="/cpanel" component={HomeCpanel} />
          <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
