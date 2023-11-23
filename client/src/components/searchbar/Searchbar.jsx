import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getVideoGames } from '../../redux/actions/actions';
import styles from "./Searchbar.module.css";

const Searchbar = ({searchTerm, setSearchTerm}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    localStorage.setItem('searchTerm', newSearchTerm); // lo mismo que en el Selector,
  }                                                    // guardo la variable para poder recuperarla rápidamente
                                                       // cuando se desmonta y monta el componente
  const handleSearch = () => {
    dispatch(getVideoGames(searchTerm));
  }

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(storedSearchTerm);
  }, [setSearchTerm]); // cuando se monta el componente, seteo el searchTerm

  return (
    <div className={styles.searchbarContainer}>
        <input id='searchBar' name='searchBar' type='text' placeholder='escribe aquí !!' value={searchTerm} onChange={handleChange} className={styles.input}></input>
        <button onClick={handleSearch} className={styles.button}>Buscar</button>
    </div>
  )
}

export default Searchbar