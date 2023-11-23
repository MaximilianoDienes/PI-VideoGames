import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
      <h1>Bienvenido!</h1>
      <NavLink to={"/home"}>
      <button className={styles.button}>Entrar</button>
      </NavLink>
      </div>
    </div>
  )
}

export default Landing