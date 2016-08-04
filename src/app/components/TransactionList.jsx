import React from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import Section from './Section';
import Transaction from './Transaction';

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
    <Section id="transaction-list">
      <div className="toolbar">
        <button className="fab" type="button" onClick={onNewTransactionClick}>
          <i className="fa-plus"></i>
        </button>
      </div>
      <TransitionMotion
        willEnter={willEnter}
        willLeave={willLeave}
        styles={getStyles(transactions)}
      >
        {styles =>
          <div>
          {styles.map((props) =>
            <Transaction
              key={props.key}
              style={props.style}
              onDeleteTransactionClick={onDeleteTransactionClick}
              {...props.data}
            />
          )}
          </div>
        }
      </TransitionMotion>
    </Section>
  );
};

export default TransactionList;
