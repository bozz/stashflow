import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './utils/localStorage';
import throttle from 'lodash/throttle';

import App from './components/App';

import reducers from './reducers';

import 'font-awesome/css/font-awesome.css';
import 'react-select/dist/react-select.css';
import '../styles/main.scss';

// restore the state
const initialState = loadState();

// tmp state extension
initialState.filters = {
  1: {
    id: 1,
    name: 'Dashboard',
    view: 'DashboardView',
    accounts: ['all'],
    categories: ['all'],
    tags: ['all'],
    query: '',
    dateFrom: '2016-01-01',
    dateTo: '2016-08-01',
    amountFrom: 0,
    amountTo: 5000,
  },
  2: {
    id: 2,
    name: 'Simple Sums',
    view: 'SimpleSumsView',
    dateFrom: '2016-01-01',
    dateTo: '2016-08-01',
  },
  3: {
    id: 3,
    name: 'Simple Sums Q1 2016',
    view: 'SimpleSumsView',
    dateFrom: '2016-01-01',
    dateTo: '2016-03-31',
  }
};
initialState.ui = {
  currentFilter: 2,
  filterSettingsExpanded: false
};

const store = createStore(reducers, initialState,
  window.devToolsExtension && window.devToolsExtension()
);

// persist the state
store.subscribe(throttle(() => {
  saveState(store.getState());
}, 1000));

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <Provider store={store} >
      <App />
    </Provider>
  </AppContainer>
  , rootEl
);

// needed for react-hot-loader 3 beta (https://github.com/gaearon/react-hot-boilerplate/pull/61)
if (module.hot) {
  module.hot.accept('./components/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./components/App').default;
    ReactDOM.render(
      <AppContainer>
        <Provider store={store} >
          <NextApp />
        </Provider>
      </AppContainer>,
      rootEl
    );
  });
}
