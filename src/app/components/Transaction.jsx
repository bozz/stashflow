import React from 'react';
import { Panel, Button } from 'react-bootstrap';

export default ({ id, name, onDeleteTransactionClick }) => (
  <Panel className="transaction">
    {name}
    <Button
      className="delete"
      bsStyle="danger"
      onClick={() => {
        onDeleteTransactionClick(id);
      }}
    >x</Button>
  </Panel>
);
