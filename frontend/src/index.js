import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//import { CookiesProvider } from 'react-cookie';
import registerServiceWorker from './registerServiceWorker';

//import createStore from redux

//create a store and pass reducer as an argument


ReactDOM.render(
    //<CookiesProvider>

    <App />

    //</CookiesProvider>
    , document.getElementById('root'));
registerServiceWorker();
