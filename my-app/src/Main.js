import React, {Component} from "react";
import { Switch, Route } from 'react-router-dom';
import CreditCard from './CreditCard.js';
import Registration from './Registration.js';
import LogOut from './LogOut.js';
import LogIn from './LogIn.js';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route path='/creditcard' component={CreditCard}/>
        <Route path='/registration' component={Registration}/>
        <Route path='/logout' component={LogOut}/>
        <Route path='/login' component={LogIn}/>
      </Switch>
    );
  }
}

export default Main;
