import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './redux/ConfigureStore'
import { Provider } from 'react-redux'

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, document.getElementById('root'));
registerServiceWorker();

function getStorageData() {
    let appData = JSON.parse(localStorage.getItem('appData'));
    if (!appData) {
        appData = {
            users: [
                {
                    userName: "Admin",
                    password: "SecurePass",
                    role: "admin",
                }],
            tasks: [],
            currentUser: {},
        }
        localStorage.setItem('appData', JSON.stringify(appData));
    }
    return appData;
}