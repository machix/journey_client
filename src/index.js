import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux';
import store from './store.js';

import RouterHome from './Components/RouterHome';

ReactDOM.render(
    <div style={{height: '100%'}}>
        <Provider store={store}>
         <RouterHome></RouterHome>
        </Provider>
    </div>
,
document.getElementById('root'));

