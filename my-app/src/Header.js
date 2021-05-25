import React from "react";
import { Link } from 'react-router-dom';

function Header() {
  const navbarBrandStyle = { fontSize: '25px' }
  const navbarStyle = { fontSize: '23px' }

  return (
    <div>
      <nav style={navbarStyle} className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to='/' className="navbar-brand" style={navbarBrandStyle}>Smart Scheduler</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to='/login' className="nav-link">Log in</Link>
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

export default Header;