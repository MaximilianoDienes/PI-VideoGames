import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideoGames, changePage } from '../../redux/actions/actions';

import { Cards } from '../../components/card/Cards';
import Selector from '../../components/selector/Selector';
import Searchbar from '../../components/searchbar/Searchbar';
import Navbar from '../../components/navbar/Navbar';

import styles from './Home.module.css';

const Home = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres);
  const filteredGames = useSelector((state) => state.filteredGames);

  useEffect(() => {
    dispatch(getVideoGames()); // obtengo videojuegos
    dispatch(getGenres()); // y géneros cada vez que se vuelve a montar el componente.
  }, []);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermReset = () => {
    setSearchTerm(''); // el searchterm lo establezco en un estado en home,
  };                   // a pesar de que lo use en el componente searchBar,
                       // así cuando aplico el reset en el Selector, puedo modificar el input searchTerm y vaciarlo
  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <Navbar></Navbar>
        <Searchbar searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Searchbar>
        <Selector allGenres={allGenres} className={styles.selector} handleSearchTermReset={handleSearchTermReset}></Selector>
      </div>
      <Cards filteredGames={filteredGames} className={styles.cards}></Cards>
    </div>
  )
}

export default Home