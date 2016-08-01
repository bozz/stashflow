import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Filter from './Filter';
import TransactionList from './TransactionList';

import * as actions from '../actions';
import { generateData } from '../utils/generateData';

const mapHeaderDispatchToProps = (dispatch) => {
  return {
    onGenerateDummyDataClick: () => {
      generateData(dispatch);
    },
    onDeleteDataClick: () => {
      dispatch(actions.deleteAllData());
    }
  };
};
const AppHeader = connect(
  null,
  mapHeaderDispatchToProps
)(Header);

const mapTransactionStateToProps = (state) => {
  return {
    transactions: state.transactions
  };
};
const mapTransactionDispatchToProps = (dispatch) => {
  return {
    onNewTransactionClick: () => {
      dispatch(actions.addTransaction());
    },
    onDeleteTransactionClick: (id) => {
      dispatch(actions.deleteTransaction(id));
    }
  };
};
const VisibleTransactionList = connect(
  mapTransactionStateToProps,
  mapTransactionDispatchToProps
)(TransactionList);

const App = ({ children }) => {
  return (
    <div className="container-fluid">
      <AppHeader />
      <Filter />
      <VisibleTransactionList />
    </div>
  );
};

App.propTypes = { children: PropTypes.object };

export default App;
