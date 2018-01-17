/* global document */

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './config/store';

import MainLayout from './views/layout/Main';

let store = null;
let isInitialized = false;

axios.all([
    axios.get('http://localhost:4000/accounts'),
    axios.get('http://localhost:4000/categories')
  ])
  .then(axios.spread((accountsRes, categoriesRes) => {
    store = configureStore({
      accounts: accountsRes.data,
      categories: categoriesRes.data
    });
    isInitialized = true;
    render(MainLayout);
  }))
  .catch((error) => {
    console.log("Error: ", error);
  });


const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {isInitialized ? (
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
      ) : (
        <h1>Initializing...</h1>
      )}
    </AppContainer>
    , document.getElementById('root')
  );
};

render(MainLayout);

if (module.hot) {
  module.hot.accept('./views/layout/Main', () => {
    const NewClient = require('./views/layout/Main').default; // eslint-disable-line global-require
    render(NewClient);
  });
}

