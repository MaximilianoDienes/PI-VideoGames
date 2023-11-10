import axios from "axios";
import { CLEAR_VIDEOGAME_DETAIL, GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID, FILTER_VIDEOGAMES, SORT_VIDEOGAMES, FILTER_VIDEOGAMES_BY_SOURCE, POST_VIDEOGAME, CHANGE_PAGE } from "./action-types";

export const getVideoGames = (name) => {
    return async function (dispatch) {
        try {
            if (name) { // caso hay Name
                const response = await axios.get(`http://localhost:3001/videogames?name=${name}`);
                return dispatch({
                    type: GET_VIDEOGAMES,
                    payload: response.data})
            } else { // caso normal
                const response = await axios.get(`http://localhost:3001/videogames`);
                return dispatch({
                type: GET_VIDEOGAMES,
                payload: response.data})    
            }
        } catch (error) {
            console.error("Error extrayendo videojuegos:", error);
        }
    }
}

export const getVideoGamesById = (id) => { // detail
    return async function (dispatch) {
        try {
            const response = await axios.get(`http://localhost:3001/videogames/${id}`);
            return dispatch({
            type: GET_VIDEOGAMES_BY_ID,
            payload: response.data})
        } catch (error) {
            console.error("Error extrayendo videojuego por id:", error);
        }
    }
}

export const clearVideoGameDetail = () => { // limpia el detail del estado global
    return async function (dispatch) {
        return dispatch({
            type: CLEAR_VIDEOGAME_DETAIL,
            payload: null
        })
    }
}

export const getGenres = () => {
    return async function (dispatch) {
        try {
            const response = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: GET_GENRES,
                payload: response.data
            })
        } catch (error) {
            console.error("Error extrayendo géneros:", error);
        }
    }
}

export const filterVideoGames = (checkedGenres) => {
    return async function (dispatch) {
        try {
            return dispatch({
                type: FILTER_VIDEOGAMES,
                payload: checkedGenres
            })
        } catch (error) {
            console.error("Error filtrando videojuegos:", error);
        }
    }
}

export const filterVideoGamesBySource = (source) => {
    return async function (dispatch) {
        try {
            return dispatch({
                type: FILTER_VIDEOGAMES_BY_SOURCE,
                payload: source
            })
        } catch (error) {
            console.error("Error filtrando videojuegos por fuente:", error);
        }
    }
}

export const sortVideoGames = (sortBy) => {
    return async function (dispatch) {
        try {
            return dispatch({
                type: SORT_VIDEOGAMES,
                payload: sortBy
            })
        } catch (error) {
            console.error("Error ordenando videojuegos:", error)
        }
    }
}

export const postVideogame = (gameData) => {
    return async function (dispatch) {
        try {
            const response = await axios.post(`http://localhost:3001/videogames`, gameData);
            return dispatch({
                type: POST_VIDEOGAME,
                payload: gameData
            })
        } catch (error) {
            console.error("Error creando videojuego:", error);
            alert("Error creando videojuego:", error);
        }
    }
}

export const changePage = (page) => {
    return async function (dispatch) {
        try {
            console.log(page);
            return dispatch({
                type: CHANGE_PAGE,
                payload: page
            })
        } catch (error) {
            console.error("Error cambiando de página:", error);
        }
    }
}