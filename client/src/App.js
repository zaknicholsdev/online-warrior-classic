import React, { useEffect, useState } from 'react';
import './App.css';
import Athletes from './components/Athletes';
import Register from './components/Register';
import Login from './components/Login';
import Athlete from './components/Athlete';
import Me from './components/Me';
import Logout from './components/Logout';
import Navbar from './components/Navbar';

import {
  HashRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Switch>
        <Route exact path="/athletes" component={Athletes} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/athlete/:id" component={Athlete} />
        <Route exact path="/me" component={Me} />
      </Switch>
    </HashRouter>
  );
};

export default App;
