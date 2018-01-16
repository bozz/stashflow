import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default class Reports extends Component {
  render() {
    return (
      <Container fluid className="dashboard">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Reports</CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

