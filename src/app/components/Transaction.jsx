import React from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default ({ id, name, date, amount, style, onDeleteTransactionClick }) => {
  const mAmount = amount || 0;
  return (<div className="transaction" style={style}>
    <span className="date">{moment(date).format('DD.MM.YYYY')}</span>
    <span className="amount">{mAmount.toFixed(2)} EUR</span>
    <span className="name">{name}</span>
    <Button
      className="delete"
      bsStyle="danger"
      onClick={() => {
        onDeleteTransactionClick(id);
      }}
    >x</Button>
  </div>);
};
