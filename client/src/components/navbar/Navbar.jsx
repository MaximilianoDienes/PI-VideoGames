import React from 'react';
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.selectorContainer1}>
      <NavLink to="/home" >
        <button className={styles.button}>Home</button>
      </NavLink>

      <NavLink to="/create">
        <button className={styles.button}>Create</button>
      </NavLink>
    </div>
  );
}

export default Navbar;
