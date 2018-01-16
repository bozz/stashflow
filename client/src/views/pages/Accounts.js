import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default class Accounts extends Component {
  render() {
    return (
      <Container fluid className="dashboard">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Accounts</CardTitle>
                <p><Link to="/transactions">Goto Transactions</Link></p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

