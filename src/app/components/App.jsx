import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Filter from './Filter';
import TransactionList from './TransactionList';

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onNewTransactionClick: () => {
      dispatch({
        type: 'ADD_TRANSACTION'
      });
    },
    onDeleteTransactionClick: (id) => {
      dispatch({
        type: 'DELETE_TRANSACTION',
        id
      });
    }
  };
};

const VisibleTransactionList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList);

const App = ({ children }) => {
  return (
    <div className="container-fluid">
      <Header />
      <Filter />
      <VisibleTransactionList />
    </div>
  );
};

App.propTypes = { children: PropTypes.object };

export default App;
