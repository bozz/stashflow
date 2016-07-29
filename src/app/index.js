import React from 'react';
import ReactDOM from 'react-dom';
import uuid from 'uuid';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

import reducers from './reducers';

import './components/bundle.scss';

const initialState = {
  transactions: [{
    id: uuid.v4(),
    name: 'Groceries shopping'
  }, {
    id: uuid.v4(),
    name: 'Rent July'
  }, {
    id: uuid.v4(),
    name: 'Car insurance 2016'
  }]
};

const createStoreWithMiddleware = applyMiddleware()(createStore);
const store = createStoreWithMiddleware(reducers, initialState);

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>
, document.getElementById('root'));
