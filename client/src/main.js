/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';

import configureStore from './config/store';

import App from './views/App';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </AppContainer>
    , document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./views/App/', () => {
    const NewClient = require('./views/App/index').default; // eslint-disable-line global-require
    render(NewClient);
  });
}

