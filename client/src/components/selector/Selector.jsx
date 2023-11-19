import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, filterVideoGames, filterVideoGamesByPlatform, filterVideoGamesBySource, resetFilterAndSort, sortVideoGames } from '../../redux/actions/actions';
import styles from "./Selector.module.css";

const Selector = ({allGenres}) => {

    const dispatch = useDispatch()

    const [checkedGenres, setCheckedGenres] = useState([]);
    const [sortBy, setSortBy] = useState("");
    const [apiOrClient, setApiOrClient] = useState("both");
    const [currentPlatform, setCurrentPlatform] = useState("All");

    const allPlatforms = useSelector((state) => state.allPlatforms);
    const page = useSelector((state) => state.page);
    const filteredGames = useSelector((state) => state.filteredGames);

    const handlePageChange = (e) => {
        if (page === 1 && e.target.value === "less") {
            alert("Te encuentras en la primer página, es imposible retroceder.")
        } else if (page === 5 && e.target.value === "more") {
            alert("Es imposible avanzar, te encuentras en la última página.")
        } else {
            if (e.target.value === "more") {
                let limit = ((page + 1) - 1) * 20 + 19;
                if (limit <= filteredGames.length) {
                    dispatch(changePage(page + 1))
                } else {
                    alert("Esta página se encuentra vacía actualmente, debido a que no hay suficientes videojuegos disponibles por el filtrado elegido.");
                }
            } else if (e.target.value === "less") {
                let limit = ((page - 1) - 1) * 20 + 19;
                if (page === 1 || limit <= filteredGames.length) {
                    dispatch(changePage(page - 1))
                }
            }
        }
    };

    const handleGenreChange = (genre) => {
        if (checkedGenres.includes(genre)) {
            const newGenreList = checkedGenres.filter((g) => g !== genre);
            setCheckedGenres(newGenreList);
        } else {
            setCheckedGenres([...checkedGenres, genre]);
        }
    }

    const handleReset = () => {
        setSortBy("");
        setApiOrClient("both");
        setCheckedGenres([]);
        setCurrentPlatform("All");
        dispatch(resetFilterAndSort());
    }

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
    };

    const handleApiOrClientChange = (e) => {
        setApiOrClient(e.target.value);
    }

    const handlePlatformChange = (e) => {
        setCurrentPlatform(e.target.value);
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

    useEffect(() => {
        dispatch(filterVideoGamesByPlatform(currentPlatform));
    }, [currentPlatform])

  return (
    <div className={styles.selectorContainer1}>
        <div className={styles.genreContainer}>
                <label htmlFor='sortBy'>Sort by:</label>
                <select id='sortBy' name ='sortBy' value={sortBy} onChange={handleSortChange}>
                    <option value="relevance">Relevance</option>
                    <option value="releaseDateE">Release Date (earliest to latest)</option>
                    <option value="releaseDateL">Release Date (latest to earliest)</option>
                    <option value="alphabeticalA">A to Z</option>
                    <option value="alphabeticalZ">Z to A</option>
                    <option value="ratingH">Rating (higher to lower)</option>
                    <option value="ratingL">Rating (lower to higher)</option>
                </select>
        </div>
        <div className={styles.genreContainer}>
                <label htmlFor='filterBy'>Filter by:</label>
                <select id='filterBy' name='filterBy' value={apiOrClient} onChange={handleApiOrClientChange}>
                    <option value="both">API and Client</option>
                    <option value="api">API</option>
                    <option value="client">Client</option>
                </select>
        </div>

        <div className={styles.genreContainer}>
            <label htmlFor='filterByPlatform'>Filter by Platform:</label>
            <select id='filterByPlatform' name='filterByPlatform' value={currentPlatform} onChange={handlePlatformChange}>
                <option key="All" value="All">All</option>
                {allPlatforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                ))}
            </select>
        </div>

        <div className={styles.genreContainer}>
            <p>Filter by Genre:</p>
                {allGenres.map((genre) => (
                    <label key={genre.id} className={styles.genre}>
                        <input
                        type="checkbox"
                        id={`genre-${genre.id}`}
                        name={`genre-${genre.id}`}
                        value={genre.name}
                        checked={checkedGenres.includes(genre.name)}
                        onChange={() => handleGenreChange(genre.name)}
                        />
                        {genre.name}
                    </label>
            ))}
        </div>

        <div className={styles.selectorContainer2}>
                <button value={"less"} className={styles.button} onClick={handlePageChange}>Anterior página</button>
                <button value={"more"} className={styles.button} onClick={handlePageChange}>Próx. página</button>
                <span className={styles.button}>Te encuentras en la página {page}</span>
        </div>

        <div className={styles.selectorContainer2}>
            <button className={styles.button} onClick={handleReset}>Reset</button>
        </div>
    </div>
  )
}

export default Selector