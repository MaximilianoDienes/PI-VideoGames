import React from 'react';
import { Link } from 'react-router-dom';

export const Card = ({name, image, genre, id}) => {

  return (
    <Link to={`/home/${id}`}>
      <div>
        <h3>{name}</h3>
        <h4>{genre}</h4>
        <img src={image} alt={`Imagen de ${name}`}></img>
      </div>
    </Link>
  )
}