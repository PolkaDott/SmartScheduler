import React from "react";
import { Switch, Route } from 'react-router-dom';
import Registration from './Registration.js';
import LogOut from './LogOut.js';
import LogIn from './LogIn.js';
import HomePage from './HomePage.js';
import Scheduler from './Scheduler.js';

function Main() {
    return (
      <Switch>
        <Route exact path='/' component={HomePage}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/logout' component={LogOut}/>
        <Route path='/login' component={LogIn}/>
        <Route path='/monday' component={Scheduler}/>
        <Route path='/tuesday' component={Scheduler}/>
        <Route path='/wednesday' component={Scheduler}/>
        <Route path='/thursday' component={Scheduler}/>
        <Route path='/friday' component={Scheduler}/>
        <Route path='/saturday' component={Scheduler}/>
        <Route path='/sunday' component={Scheduler}/>
      </Switch>
    );
}

export default Main;
