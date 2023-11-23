import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePage, filterVideoGames, filterVideoGamesByPlatform, filterVideoGamesBySource, resetFilterAndSort, sortVideoGames } from '../../redux/actions/actions';
import styles from "./Selector.module.css";

const Selector = ({allGenres, handleSearchTermReset}) => {

    const dispatch = useDispatch()

    const [checkedGenres, setCheckedGenres] = useState(JSON.parse(localStorage.getItem('checkedGenres')) || []); // si no tengo valores para los estados en el storage local
    const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || "");                                  // entonces se inicializan con el caso por default
    const [apiOrClient, setApiOrClient] = useState(localStorage.getItem('apiOrClient') || "both");
    const [currentPlatform, setCurrentPlatform] = useState(localStorage.getItem('currentPlatform') || "All");

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
                let limit = ((page + 1) - 1) * 20 + 19; // esto es para limitar la cantidad de videojuegos por página (20)
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
        if (checkedGenres.includes(genre)) { // si el género ya está en checkedGenres, entonces se elimina
            const newGenreList = checkedGenres.filter((g) => g !== genre);
            setCheckedGenres(newGenreList);
        } else {
            setCheckedGenres([...checkedGenres, genre]); // si no está, se agrega
        }
    }

    const handleReset = () => {
        handleSearchTermReset();
        setSortBy("");
        setApiOrClient("both");
        setCheckedGenres([]);
        setCurrentPlatform("All"); // todos los estados vuelven a su valor inicial, y despacho una acción que resetea filteredGames,
        dispatch(resetFilterAndSort()); // los valores de los filtros y los sorteos en el estado global
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

    useEffect(() => { // cada vez que cambia el valor de alguno de los estados, lo guardo en el localStorage
        localStorage.setItem('checkedGenres', JSON.stringify(checkedGenres));   // y despacho una acción
        localStorage.setItem('sortBy', sortBy);                                 // para cambiar su valor en el estado global
        localStorage.setItem('apiOrClient', apiOrClient);                       // el propósito del localStorage es poder guardar los valores de los inputs
        localStorage.setItem('currentPlatform', currentPlatform);               // para que cuando se desmonte y se monte el componente,
                                                                                // los pueda recuperar rápidamente
        dispatch(filterVideoGames(checkedGenres));
        dispatch(sortVideoGames(sortBy));
        dispatch(filterVideoGamesBySource(apiOrClient));
        dispatch(filterVideoGamesByPlatform(currentPlatform));

    }, [checkedGenres, sortBy, apiOrClient, currentPlatform]);

  return (
    <div className={styles.selectorContainer1}>
        <div className={styles.genreContainer}>
                <label htmlFor='sortBy'>Ordenar por:</label>
                <select id='sortBy' name ='sortBy' value={sortBy} onChange={handleSortChange} className={styles.sortBy}>
                    <option value="relevance">Relevancia</option>
                    <option value="releaseDateE">Fecha de lanzamiento (nuevos primero)</option>
                    <option value="releaseDateL">Fecha de lanzamiento (viejos primero)</option>
                    <option value="alphabeticalA">Alfabéticamente (A - Z)</option>
                    <option value="alphabeticalZ">Alfabéticamente (Z - A)</option>
                    <option value="ratingH">Rating (mayor a menor)</option>
                    <option value="ratingL">Rating (menor a mayor)</option>
                </select>
        </div>
        <div className={styles.genreContainer}>
                <label htmlFor='filterBy'>Filtrar por:</label>
                <select id='filterBy' name='filterBy' value={apiOrClient} onChange={handleApiOrClientChange}>
                    <option value="both">API y Cliente</option>
                    <option value="api">API</option>
                    <option value="client">Cliente</option>
                </select>
        </div>

        <div className={styles.genreContainer}>
            <label htmlFor='filterByPlatform'>Filtrar por Plataforma:</label>
            <select id='filterByPlatform' name='filterByPlatform' value={currentPlatform} onChange={handlePlatformChange}>
                <option key="All" value="All">Todas</option>
                {allPlatforms.map((platform) => (
                    <option key={platform} value={platform}>{platform}</option>
                ))}
            </select>
        </div>

        <div className={styles.genreContainer}>
            <p>Filtrar por género:</p>
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