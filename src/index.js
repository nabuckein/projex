import 'core-js/es6/map';
import 'core-js/es6/set';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.js';
import registerServiceWorker from './registerServiceWorker.js';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
