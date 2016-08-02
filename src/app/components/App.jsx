import React from 'react';
import Header from '../containers/Header';
import Filter from './Filter';
import FilterDataView from '../containers/FilterDataView';
import VisibleTransactionList from '../containers/VisibleTransactionList';

const App = () => {
  return (
    <div className="container-fluid">
      <Header />
      <Filter />
      <FilterDataView />
      <VisibleTransactionList />
    </div>
  );
};

export default App;
