import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as actions from '../actions';
import TransactionList from '../components/TransactionList';

const transactionsSelector = state => state.transactions;
const sortKeySelector = state => 'date';

const sortTransactionsSelector = createSelector(
  transactionsSelector,
  sortKeySelector,
  (transactions, sortKey) => {
    return transactions.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return 1;
      } else if (a[sortKey] > b[sortKey]) {
        return -1;
      }
      return 0;
    });
  }
);

const mapStateToProps = (state) => {
  return {
    transactions: sortTransactionsSelector(state)
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onNewTransactionClick: () => {
      dispatch(actions.addTransaction());
    },
    onDeleteTransactionClick: (id) => {
      dispatch(actions.deleteTransaction(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionList);
