import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideoGames, changePage } from '../../redux/actions/actions';

import { Cards } from '../../components/card/Cards';
import Selector from '../../components/selector/Selector';
import Searchbar from '../../components/searchbar/Searchbar';

const Home = () => {

  const dispatch = useDispatch();

  const allGenres = useSelector((state) => state.allGenres);
  const filteredGames = useSelector((state) => state.filteredGames);

  const handlePageChange = (e) => {
    let limit = (e.target.value - 1) * 20 + 19;
    if (e.target.value === 1 || limit <= filteredGames.length) {
      dispatch(changePage(e.target.value));
    } else {
      alert("Esta página se encuentra vacía actualmente, debido a que no hay suficientes videojuegos disponibles por el filtrado elegido.")
    }
  };

  useEffect(() => {
    dispatch(getVideoGames());
    dispatch(getGenres());
  }, []);

  return (
    <div>
      <h1>Este es el home</h1>
      <div>
        <button onClick={handlePageChange} value={1}>Página 1</button>
        <button onClick={handlePageChange} value={2}>Página 2</button>
        <button onClick={handlePageChange} value={3}>Página 3</button>
        <button onClick={handlePageChange} value={4}>Página 4</button>
        <button onClick={handlePageChange} value={5}>Página 5</button>
      </div>
      <Searchbar></Searchbar>
      <Selector allGenres={allGenres}></Selector>
      <Cards filteredGames={filteredGames}></Cards>
    </div>
  )
}

export default Home