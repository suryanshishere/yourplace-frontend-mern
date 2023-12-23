import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth-context';
import { UIContext } from '../../context/ui-context';
import Button from '../FormElements/Button';

import './NavLinks.css';

const NavLinks = props => {

  const ui = useContext(UIContext);
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const navLinkHandler = () => {
      ui.closeDrawer()
  }

  const logoutHandler = () => {
      navigate('auth');
      auth.logout()
      ui.closeDrawer()
  }

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact="true" onClick={navLinkHandler}>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`} onClick={navLinkHandler}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new" onClick={navLinkHandler}>ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth" onClick={navLinkHandler}>AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && <li>
        <Button onClick={logoutHandler}>Log Out</Button>
      </li>}
    </ul>
  );
};

export default NavLinks;