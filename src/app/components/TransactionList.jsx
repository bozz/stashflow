import React from 'react';
import Transaction from './Transaction';

export default ({ transactions, onNewTransactionClick }) => (
  <div className="transaction-list">
    <button onClick={onNewTransactionClick}>Add Transaction</button>
    <ul>{transactions.map(props =>
      <li key={props.id}>
        <Transaction {...props} />
      </li>
    )}</ul>
  </div>
);
