import { CLEAR_VIDEOGAME_DETAIL, FILTER_VIDEOGAMES, GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID, SORT_VIDEOGAMES, FILTER_VIDEOGAMES_BY_SOURCE, POST_VIDEOGAME, CHANGE_PAGE, RESET_FILTER_AND_SORT, FILTER_VIDEOGAMES_BY_PLATFORM } from "../actions/action-types";
import { sortVideoGames, filterVideoGames, filterVideoGamesBySource, filterVideoGamesByPlatform } from "./filterAndSorting";

let initialState = {
    allGames: [],
    filteredGames: [],
    allGenres: [],
    gameDetail: {},
    filterGenres: [],
    sortBy: [],
    apiOrClient: "both",
    relevanceSort: [], // sorteado de relevancia original
    allPlatforms: [], // para filtrar por plataforma !
    filterPlatform: "All",
    page: 1, 
    allGamesBackupReset: [] // para que funcione el reset cuando hay name query :)
}



const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            if (payload.data && payload.name) { // caso name query
                return {...state, filteredGames: payload.data, relevanceSort: payload.data, allGames: payload.data};
            }
            if (state.allGames.length > 0 && state.allPlatforms.length > 0 && state.allGenres.length > 0) { // si ya tenemos todos los juegos de la API, plataformas y géneros
                return {...state};                                                                          // entonces no modificamos nada
            }
            else if (payload && payload.allPlatforms) { // caso normal
                return {...state, allGames: payload.allGames, filteredGames: payload.allGames, relevanceSort: payload.allGames, allPlatforms: payload.allPlatforms, allGamesBackupReset: payload.allGames};
            }
        
        case GET_VIDEOGAMES_BY_ID:
            return {...state, gameDetail: payload}
        
        case CLEAR_VIDEOGAME_DETAIL:
            return {...state, gameDetail: {}}
        
        case GET_GENRES:
            return {...state, allGenres: payload}
        
        case FILTER_VIDEOGAMES:
            if (payload) {
                let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, state.sortBy)
                let newFilteredGames2 = filterVideoGames(newFilteredGames, payload);
                let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, state.apiOrClient);
                let newFilteredGames4 = filterVideoGamesByPlatform(newFilteredGames3, state.filterPlatform)
                return {...state, filteredGames: newFilteredGames4, filterGenres: payload}; 
            }

        case SORT_VIDEOGAMES:
            if (payload) {                   
                let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, payload);
                let newFilteredGames2 = filterVideoGames(newFilteredGames, state.filterGenres);
                let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, state.apiOrClient);
                let newFilteredGames4 = filterVideoGamesByPlatform(newFilteredGames3, state.filterPlatform)
                return {...state, filteredGames: newFilteredGames4, sortBy: payload}
            }

        case FILTER_VIDEOGAMES_BY_SOURCE:
            let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, state.sortBy);
            let newFilteredGames2 = filterVideoGames(newFilteredGames, state.filterGenres);
            let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, payload);
            let newFilteredGames4 = filterVideoGamesByPlatform(newFilteredGames3, state.filterPlatform)
            return {...state, filteredGames: newFilteredGames4, apiOrClient: payload};
        
        case FILTER_VIDEOGAMES_BY_PLATFORM:
            if (payload) {
                let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, state.sortBy);
                let newFilteredGames2 = filterVideoGames(newFilteredGames, state.filterGenres);
                let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, state.apiOrClient);
                let newFilteredGames4 = filterVideoGamesByPlatform(newFilteredGames3, payload);
                return {...state, filteredGames: newFilteredGames4, filterPlatform: payload}; 
            }

        case POST_VIDEOGAME:
            return {...state, filteredGames: [payload, ...state.filteredGames]};
        
        case CHANGE_PAGE:
            return {...state, page: payload};
        
        case RESET_FILTER_AND_SORT:
            return {...state, allGames: state.allGamesBackupReset, filteredGames: state.allGamesBackupReset, relevanceSort: state.allGamesBackupReset, filterGenres: [], sortBy: [], filterPlatform: "All", page: 1};

        default:
            return state;
    }
};  

export default rootReducer;