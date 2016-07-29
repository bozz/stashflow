import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';

import App from './components/App';

import reducers from './reducers';

import './components/bundle.scss';

// restore the state
const persistedState = loadState();

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers, persistedState);

// persist the state
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
, document.getElementById('root'));
