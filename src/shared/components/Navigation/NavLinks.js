import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthenticationContext } from "../../context/authContext";
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
        {authenticationContext.isLoggedIn && (
          <NavLink to={`/${authenticationContext.userId}/places`}>
            MY PLACES
          </NavLink>
        )}
      </li>
      <li>
        {authenticationContext.isLoggedIn && (
          <NavLink to="/places/new">ADD PLACE</NavLink>
        )}
      </li>
      <li>
        {!authenticationContext.isLoggedIn && (
          <NavLink to="/login">LOG IN</NavLink>
        )}
      </li>
      <li>
        {!authenticationContext.isLoggedIn && (
          <NavLink to="/signup">SIGN UP</NavLink>
        )}
      </li>
      <li>
        {authenticationContext.isLoggedIn && (
          <button onClick={authenticationContext.logout}>LOG OUT</button>
        )}
      </li>
    </ul>
  );
}

export default NavLinks;
