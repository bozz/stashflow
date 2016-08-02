import { connect } from 'react-redux';
import * as actions from '../actions';
import TransactionList from '../components/TransactionList';

// TODO: find better way to handle sorting - use reselect!
const sortTransactions = transactions => {
  return transactions.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
};

const mapStateToProps = (state) => {
  return {
    transactions: sortTransactions(state.transactions)
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
