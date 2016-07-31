import React from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';
import ContentRow from './ContentContainer';
import Transaction from './Transaction';

export default ({ transactions, onNewTransactionClick, onDeleteTransactionClick }) => (
  <div className="transaction-list">
    <ContentRow>
      <ButtonToolbar className="toolbar">
        <Button bsStyle="primary" onClick={onNewTransactionClick}>Add Transaction</Button>
      </ButtonToolbar>
    </ContentRow>
    {transactions.map(props =>
      <ContentRow key={props.id}>
        <Transaction onDeleteTransactionClick={onDeleteTransactionClick} {...props} />
      </ContentRow>
    )}
  </div>
);
