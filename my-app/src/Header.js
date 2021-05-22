import React, {Component} from "react";
import { Link } from 'react-router-dom';
import './Header.css';
import timb from './timb.png';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid text-end">
            <a className="navbar-brand" href="#">Smart Scheduler</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to='/creditcard' className="nav-link">Log in</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/registration' className="nav-link">Log up</Link>
                  </li>
                  <li className="nav-item">
                    <Link to='/logout' className="nav-link">Log out</Link>
                  </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
