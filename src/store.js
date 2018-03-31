import {applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './Helpers/middleware';
import thunk from 'redux-thunk';

import common from './Reducers/common.js';
import auth from './Reducers/auth.js';
import choreographer from './Reducers/choreographer.js';
import dashState from './Reducers/dashState';

const reducer = combineReducers({
    common,
    dashState,
    choreographer
    ,
    auth
});

const middleware = applyMiddleware(thunk, promiseMiddleware/*, localStorageMiddleware*/);

const store = createStore(reducer, middleware);

export default store;