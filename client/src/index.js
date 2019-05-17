import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import CustomSaga from './sagas'
import { BrowserRouter } from 'react-router-dom'
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// mount it on the Store
const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
)

// Run the saga
sagaMiddleware.run(CustomSaga)

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
