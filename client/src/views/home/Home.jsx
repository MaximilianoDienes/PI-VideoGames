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
    dispatch(getVideoGames());
    dispatch(getGenres());
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <Navbar></Navbar>
        <Searchbar></Searchbar>
        <Selector allGenres={allGenres} className={styles.selector}></Selector>
      </div>
      <Cards filteredGames={filteredGames} className={styles.cards}></Cards>
    </div>
  )
}

export default Home