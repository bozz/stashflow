import { connect } from 'react-redux';
import { filteredAndSortedTransactionsSelector } from '../selectors';
import * as actions from '../actions';
import TransactionList from '../components/TransactionList';

const mapStateToProps = (state) => {
  return {
    transactions: filteredAndSortedTransactionsSelector(state)
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
