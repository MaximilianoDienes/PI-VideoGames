import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Cards.module.css";

export const Card = ({name, image, genre, id, apiOrClient}) => {

  const formattedGenres = genre ? genre.join(', ') : ''; // formateo para los géneros

  return (
    <Link to={`/home/${id}`} className={styles.link}>
      <div className={styles.card}>
        <h3 className={styles.titleHeader}>{name}</h3>
        <h4>{formattedGenres}</h4>
        <h6>{apiOrClient}</h6>
        <img src={image} alt={`Imagen de ${name}`} className={styles.image}></img> 
      </div>
    </Link>
  )
}