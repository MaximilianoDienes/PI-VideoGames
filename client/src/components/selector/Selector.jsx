import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterVideoGames, filterVideoGamesBySource, sortVideoGames } from '../../redux/actions/actions';

const Selector = ({allGenres}) => {

    const dispatch = useDispatch()

    const [checkedGenres, setCheckedGenres] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [apiOrClient, setApiOrClient] = useState("both");

    const handleGenreChange = (genre) => {
        if (checkedGenres.includes(genre)) {
            const newGenreList = checkedGenres.filter((g) => g !== genre);
            setCheckedGenres(newGenreList);
        } else {
            setCheckedGenres([...checkedGenres, genre]);
        }
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleApiOrClientChange = (e) => {
        setApiOrClient(e.target.value);
    }

    useEffect(() => {
        dispatch(filterVideoGames(checkedGenres));
    }, [checkedGenres]);

    useEffect(() => {
        dispatch(sortVideoGames(sortBy));
    }, [sortBy])

    useEffect(() => {
        dispatch(filterVideoGamesBySource(apiOrClient));
    }, [apiOrClient])

  return (
    <div>
        <label>Order by:</label>
        <select onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="releaseDateE">Release Date (earliest to latest)</option>
            <option value="releaseDateL">Release Date (latest to earliest)</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="rating">Rating</option>
        </select>

        <label>Filter by Genre:</label>
        {allGenres.map((genre) => (
            <label key={genre.id}>
                <input
                type="checkbox"
                value={genre.name}
                onChange={() => handleGenreChange(genre.name)}
                />
                {genre.name}
            </label>
        ))}

        <label>Filter by:</label>
        <select onChange={handleApiOrClientChange}>
            <option value="both">API and Client</option>
            <option value="api">API</option>
            <option value="client">Client</option>
        </select>
    </div>
  )
}

export default Selector