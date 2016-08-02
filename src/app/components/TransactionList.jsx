import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import { connect } from 'react-redux';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import ContentRow from './ContentContainer';
import Transaction from './Transaction';
import * as actions from '../actions';

const getStyles = (transactions) => {
  return transactions.map(props => ({
    key: props.id,
    data: props,
    style: {
      height: spring(60, presets.gentle),
      marginBottom: spring(20, presets.gentle),
      opacity: spring(1, presets.gentle)
    },
  }));
};

const willEnter = () => {
  return {
    height: 0,
    marginBottom: 20,
    opacity: 0,
  };
};

const willLeave = () => {
  return {
    height: spring(0),
    marginBottom: spring(0),
    opacity: spring(0),
  };
};

const TransactionList = ({ transactions, onNewTransactionClick, onDeleteTransactionClick }) => {
  return (
    <div className="transaction-list">
      <ContentRow className="toolbar dogs">
        <ButtonToolbar>
          <Button className="fab" bsStyle="primary" onClick={onNewTransactionClick}>
            <Glyphicon glyph="plus" />
          </Button>
        </ButtonToolbar>
      </ContentRow>
      <TransitionMotion
        willEnter={willEnter}
        willLeave={willLeave}
        styles={getStyles(transactions)}
      >
        {styles =>
          <ContentRow>
          {styles.map((props) =>
            <Transaction
              key={props.key}
              style={props.style}
              onDeleteTransactionClick={onDeleteTransactionClick}
              {...props.data}
            />
          )}
          </ContentRow>
        }
      </TransitionMotion>
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
