import { createStore, applyMiddleware, compose  } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import promiseMiddleware from 'redux-promise-middleware';
import history from './history';
import { routerMiddleware } from 'react-router-redux';
const middleware = routerMiddleware(history);
const loggerMiddleware = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(
        middleware,
        thunkMiddleware,
        loggerMiddleware,
        promiseMiddleware(),
    ),
));
