import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getVideoGames } from '../../redux/actions/actions';

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
    <div>
        <input type='text' placeholder='escribe aquí !!' value={searchTerm} onChange={handleChange}></input>
        <button onClick={handleSearch}>Buscar</button>
    </div>
  )
}

export default Searchbar