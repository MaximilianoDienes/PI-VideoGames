import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getVideoGames } from '../../redux/actions/actions';
import styles from "./Searchbar.module.css";

const Searchbar = () => {

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSearch = () => {
        dispatch(getVideoGames(searchTerm));
    }

  return (
    <div className={styles.searchbarContainer}>
        <input id='searchBar' name='searchBar' type='text' placeholder='escribe aquí !!' value={searchTerm} onChange={handleChange} className={styles.input}></input>
        <button onClick={handleSearch} className={styles.button}>Buscar</button>
    </div>
  )
}

export default Searchbar