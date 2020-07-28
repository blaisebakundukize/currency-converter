import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Currency
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
