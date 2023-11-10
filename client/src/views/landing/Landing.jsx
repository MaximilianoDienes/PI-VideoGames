import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>Este es el landing</h1>
      <NavLink to={"/home"}>
      <button>Ingresar</button>
      </NavLink>
    </div>
  )
}

export default Landing