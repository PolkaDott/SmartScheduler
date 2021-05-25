import React from "react";
import { Switch, Route } from 'react-router-dom';
import Registration from './Registration.js';
import LogOut from './LogOut.js';
import LogIn from './LogIn.js';
import HomePage from './HomePage.js';

function Main() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/logout' component={LogOut}/>
        <Route path='/login' component={LogIn}/>
      </Switch>
    );
}

export default Main;
