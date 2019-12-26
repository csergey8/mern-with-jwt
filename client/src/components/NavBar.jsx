import React from "react";
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { logOut } = useContext(AuthContext)

  const logOutHandler = e => {
    e.preventDefault();
    logOut();  
  }
  return (
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create</NavLink>
          </li> 
          <li>
            <NavLink to="/links">Create</NavLink>
          </li> 
          <li>
              <a href="/" onClick={logOutHandler}>Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export { NavBar };
