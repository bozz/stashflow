import React from 'react';
import { ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import ContentRow from './ContentContainer';
import Transaction from './Transaction';

export default ({ transactions, onNewTransactionClick, onDeleteTransactionClick }) => (
  <div className="transaction-list">
    <ContentRow>
      <ButtonToolbar className="toolbar">
        <Button bsStyle="primary" onClick={onNewTransactionClick}>
          <Glyphicon glyph="plus" />
        </Button>
      </ButtonToolbar>
    </ContentRow>
    {transactions.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      }
      return 0;
    }).map(props =>
      <ContentRow key={props.id}>
        <Transaction onDeleteTransactionClick={onDeleteTransactionClick} {...props} />
      </ContentRow>
    )}
  </div>
);
