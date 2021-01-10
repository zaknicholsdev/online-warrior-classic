import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
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
  Route
} from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/users/me', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(result => {
        if (result.msg === 'No token. Authorization denied.') {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        };
      });
  }, []);

  return (
    <HashRouter>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn === true ?
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/athletes" component={Athletes} />
          <Route exact path="/register" render={() => <Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/login" render={() => <Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/athlete/:id" component={Athlete} />
          <Route exact path="/me" component={Me} />
        </Switch> :
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" render={() => <Register setIsLoggedIn={setIsLoggedIn} />} />
          <Route exact path="/login" render={() => <Login setIsLoggedIn={setIsLoggedIn} />} />
        </Switch>
      }
    </HashRouter>
  );
};

export default App;
