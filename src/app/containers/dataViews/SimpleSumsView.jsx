import React from 'react';
import { connect } from 'react-redux';

const SimpleSumsView = ({ transactions }) => (
  <div id="view-simple-sums">
    <span className="income">Total Income: 0,00 EUR</span>
    <span className="expenses">Total Expenses: 0,00 EUR</span>
    <span className="count">Transactions: {transactions.length}</span>
  </div>
);

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  };
};

export default connect(
  mapStateToProps
)(SimpleSumsView);
