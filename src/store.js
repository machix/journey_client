import {applyMiddleware, createStore, combineReducers } from 'redux';
import { promiseMiddleware } from './Helpers/middleware';
import thunk from 'redux-thunk';

import common from './Reducers/common.js';
import auth from './Reducers/auth.js';
import businessReducer from './Reducers/businessReducer.js';
import dashState from './Reducers/dashState';
import billingReducer from './Reducers/billingReducer';

const reducer = combineReducers({
    common,
    dashState,
    businessReducer,
    billingReducer,
    auth
});

const middleware = applyMiddleware(thunk, promiseMiddleware/*, localStorageMiddleware*/);

const store = createStore(reducer, middleware);

export default store;