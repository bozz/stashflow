import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// let store = null;
// let isInitialized = false;
// axios.all([
//     axios.get('http://localhost:4000/accounts'),
//     axios.get('http://localhost:4000/categories')
//   ])
//   .then(axios.spread((accountsRes, categoriesRes) => {
//     store = configureStore({
//       accounts: accountsRes.data,
//       categories: categoriesRes.data
//     });
//     isInitialized = true;
//     render(MainLayout);
//   }))
//   .catch((error) => {
//     console.log("Error: ", error);
//   });


function renderApp() {
  const configureStore = require("./config/store").default;
  const MainLayout = require("./views/layout/Main").default;

  ReactDOM.render(
    <Provider store={configureStore()}>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </Provider>
    , document.getElementById('root')
  );
}

renderApp();

if (module.hot) {
  module.hot.accept(() => {
    renderApp();
  });
}

