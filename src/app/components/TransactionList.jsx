import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import ContentRow from './ContentContainer';
import Transaction from './Transaction';
import * as actions from '../actions';

const TransactionList = ({ transactions, onNewTransactionClick, onDeleteTransactionClick }) => {
  return (
    <div className="transaction-list">
      <ContentRow className="toolbar">
        <ButtonToolbar>
          <Button className="fab" bsStyle="primary" onClick={onNewTransactionClick}>
            <Glyphicon glyph="plus" />
          </Button>
        </ButtonToolbar>
      </ContentRow>
      {transactions.map(props =>
        <ContentRow key={props.id}>
          <Transaction onDeleteTransactionClick={onDeleteTransactionClick} {...props} />
        </ContentRow>
      )}
    </div>
  );
};


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
