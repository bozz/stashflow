import React from 'react';
import { Panel, Button } from 'react-bootstrap';
import moment from 'moment';

export default ({ id, name, date, amount, onDeleteTransactionClick }) => (
  <Panel className="transaction">
    <span className="date">{moment(date).format('DD.MM.YYYY')}</span>
    <span className="amount">{amount.toFixed(2)} EUR</span>
    <span className="name">{name}</span>
    <Button
      className="delete"
      bsStyle="danger"
      onClick={() => {
        onDeleteTransactionClick(id);
      }}
    >x</Button>
  </Panel>
);
