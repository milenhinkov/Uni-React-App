import React, { Component, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';


const Context = createContext();
const { Provider } = Context;

ReactDOM.render(
    <Provider value={{ firstName: 'Didier', lastName: 'Franc' }}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
