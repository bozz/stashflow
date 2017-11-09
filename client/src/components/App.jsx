import React from 'react';
import Header from '../containers/Header';
import Filter from '../containers/Filter';
import FilterDataView from '../containers/FilterDataView';
import VisibleTransactionList from '../containers/VisibleTransactionList';

const App = () => {
  return (
    <div id="container">
      <Header />
      <Filter />
      <FilterDataView />
      <VisibleTransactionList />
    </div>
  );
};

export default App;
