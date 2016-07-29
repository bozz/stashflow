import React from 'react';
import { ButtonToolbar, Button, Grid, Row, Col } from 'react-bootstrap';
import Transaction from './Transaction';

export default ({ transactions, onNewTransactionClick }) => (
  <Grid className="transaction-list" fluid>
    <Row>
      <Col md={6} mdOffset={3}>
        <ButtonToolbar>
          <Button bsStyle="primary" onClick={onNewTransactionClick}>Add Transaction</Button>
        </ButtonToolbar>
      </Col>
    </Row>
    {transactions.map(props =>
      <Row key={props.id}>
        <Col md={6} mdOffset={3}>
          <Transaction {...props} />
        </Col>
      </Row>
    )}
  </Grid>
);
