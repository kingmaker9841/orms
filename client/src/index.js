import 'react-app-polyfill/ie9'; // For IE 9-11 support
import 'react-app-polyfill/stable';
// import 'react-app-polyfill/ie11'; // For IE 11 support
import './polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import LoginPage from './views/Pages/Login/Login';
import { server } from './config/server';
import * as serviceWorker from './serviceWorker';
import "react-toastify/dist/ReactToastify.css"
import { Provider } from 'react-redux';
import { store } from './redux/store';

//  ReactDOM.render(<App />, document.getElementById("root"));

server.get('/isLoggedIn').then(json => {
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
        , document.getElementById('root'));
}).catch(err => {
    ReactDOM.render(<LoginPage />, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
