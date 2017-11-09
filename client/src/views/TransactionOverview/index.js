import React, { Component } from 'react';
import { Container, Row, Col, Jumbotron } from 'reactstrap';

export default class TransactionOverview extends Component {
  render() {
    return (
      <Container className="transaction-overview">
        <Row>
          <Col>
            <Jumbotron>
              <h1>Transactions</h1>
              <p>This is where all transactions will be listed...</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
}
