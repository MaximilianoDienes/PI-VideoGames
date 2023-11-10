import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <NavLink to="/home">
        <button>Home</button>
      </NavLink>

      <NavLink to="/create">
        <button>Create</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
