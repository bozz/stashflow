import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
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
