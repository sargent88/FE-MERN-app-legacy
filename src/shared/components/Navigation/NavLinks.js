import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthenticationContext } from "../../context/authenticationContext";
import "./NavLinks.css";

function NavLinks(props) {
  const authenticationContext = useContext(AuthenticationContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" end>
          ALL USERS
        </NavLink>
      </li>
      <li>
        {authenticationContext.isAuthenticated && (
          <NavLink to={`/${authenticationContext.userId}/places`}>
            MY PLACES
          </NavLink>
        )}
      </li>
      <li>
        {authenticationContext.isAuthenticated && (
          <NavLink to="/places/new">ADD PLACE</NavLink>
        )}
      </li>
      <li>
        {!authenticationContext.isAuthenticated && (
          <NavLink to="/login">LOG IN</NavLink>
        )}
      </li>
      <li>
        {!authenticationContext.isAuthenticated && (
          <NavLink to="/signup">SIGN UP</NavLink>
        )}
      </li>
      <li>
        {authenticationContext.isAuthenticated && (
          <button onClick={authenticationContext.logout}>LOG OUT</button>
        )}
      </li>
    </ul>
  );
}

export default NavLinks;
