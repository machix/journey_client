import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import {Provider} from 'react-redux';
import store from './store.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import RouterHome from './Components/RouterHome';

ReactDOM.render(
    <div style={{height: '100%'}}>
        <Provider store={store}>
         <RouterHome></RouterHome>
        </Provider>
        <ToastContainer autoClose={2000} position={toast.POSITION.BOTTOM_RIGHT} hideProgressBar={true}/>
    </div>
,
document.getElementById('root'));

