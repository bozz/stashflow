import React from 'react';
import { ButtonToolbar, Button, Grid, Row, Col } from 'react-bootstrap';
import Transaction from './Transaction';

export default ({ transactions, onNewTransactionClick, onDeleteTransactionClick }) => (
  <Grid className="transaction-list" fluid>
    <Row>
      <Col md={6} mdOffset={3}>
        <ButtonToolbar className="toolbar">
          <Button bsStyle="primary" onClick={onNewTransactionClick}>Add Transaction</Button>
        </ButtonToolbar>
      </Col>
    </Row>
    {transactions.map(props =>
      <Row key={props.id}>
        <Col md={6} mdOffset={3}>
          <Transaction onDeleteTransactionClick={onDeleteTransactionClick} {...props} />
        </Col>
      </Row>
    )}
  </Grid>
);
