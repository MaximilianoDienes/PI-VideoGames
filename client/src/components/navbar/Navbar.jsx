import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const location = useLocation();
  const isCreateRoute = location.pathname === '/create';

  return (
    <div className={styles.selectorContainer1}>
      <NavLink to="/home" >
        <button className={styles.button}>Home</button>
      </NavLink>

      {isCreateRoute ? null : (
        <NavLink to="/create">
          <button className={styles.button}>Create</button>
        </NavLink>
      )}
    </div>
  );
}

export default Navbar;
