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
    relevanceSort: [],
    allPlatforms: [],
    filterPlatform: "All",
    page: 1
}



const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case GET_VIDEOGAMES:
            if (state.allGames.length > 0 && state.allPlatforms.length > 0 && state.allGenres.length > 0) {
                return {...state}
            } else {
                if (payload && payload.allPlatforms) {
                    return {...state, allGames: payload.allGames, filteredGames: payload.allGames, relevanceSort: payload.allGames, allPlatforms: payload.allPlatforms};
                } else if (payload) {
                    return {...state, filteredGames: payload};
                }
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
            return {...state, filteredGames: state.allGames, filterGenres: [], sortBy: [], filterPlatform: "All"};

        default:
            return state;
    }
};  

export default rootReducer;