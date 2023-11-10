import { CLEAR_VIDEOGAME_DETAIL, FILTER_VIDEOGAMES, GET_GENRES, GET_VIDEOGAMES, GET_VIDEOGAMES_BY_ID, SORT_VIDEOGAMES, FILTER_VIDEOGAMES_BY_SOURCE, POST_VIDEOGAME, CHANGE_PAGE } from "../actions/action-types";
import { sortVideoGames, filterVideoGames, filterVideoGamesBySource } from "./filterAndSorting";

let initialState = {
    allGames: [],
    filteredGames: [],
    allGenres: [],
    gameDetail: {},
    filterGenres: [],
    sortBy: [],
    apiOrClient: "both",
    relevanceSort: [],
    page: 1
}



const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            return {...state, allGames: payload, filteredGames: payload, relevanceSort: payload}
        
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
                return {...state, filteredGames: newFilteredGames3, filterGenres: payload}; 
            }

        case SORT_VIDEOGAMES:
            if (payload) {                                         
                let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, payload);
                let newFilteredGames2 = filterVideoGames(newFilteredGames, state.filterGenres);
                let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, state.apiOrClient);
                return {...state, filteredGames: newFilteredGames3, sortBy: payload}
            }

        case FILTER_VIDEOGAMES_BY_SOURCE:
            let newFilteredGames = sortVideoGames(state.allGames, state.relevanceSort, state.sortBy);
            let newFilteredGames2 = filterVideoGames(newFilteredGames, state.filterGenres);
            let newFilteredGames3 = filterVideoGamesBySource(newFilteredGames2, payload);
            return {...state, filteredGames: newFilteredGames3, apiOrClient: payload};

        case POST_VIDEOGAME:
            return {...state, filteredGames: [payload, ...state.filteredGames]};
        
        case CHANGE_PAGE:
            return {...state, page: payload};

        default:
            return state;
    }
};  

export default rootReducer;