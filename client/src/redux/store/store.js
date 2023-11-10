import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "../reducer/reducer.js";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore( // en store se almacenan las actions y el reducer
    rootReducer,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;