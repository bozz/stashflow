import React, { PropTypes } from 'react';
import Header from './Header';
import Filter from './Filter';
import DataViewContainer from './DataViewContainer';
import TransactionList from './TransactionList';

const App = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />
      <Filter />
      <DataViewContainer />
      <TransactionList />
    </div>
  );
};

App.propTypes = { children: PropTypes.object };

export default App;
