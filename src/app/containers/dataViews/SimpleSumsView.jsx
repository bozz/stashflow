import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const transactionSelector = state => state.transactions;
const totalExpenseSelector = createSelector(
  transactionSelector,
  (items) => items.reduce((acc, item) => acc + (item.amount || 0), 0)
);

const SimpleSumsView = ({ transactionCount, expenseSum, incomeSum }) => (
  <div id="view-simple-sums">
    <span className="income">Total Income: 0,00 EUR</span>
    <span className="expenses">Total Expenses: {expenseSum},00 EUR</span>
    <span className="count">Transactions: {transactionCount}</span>
  </div>
);

const mapStateToProps = (state) => {
  return {
    transactionCount: state.transactions.length,
    expenseSum: totalExpenseSelector(state),
    incomeSum: 0
  };
};

export default connect(
  mapStateToProps
)(SimpleSumsView);
