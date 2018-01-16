import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';

export default class Settings extends Component {
  render() {
    return (
      <Container fluid className="settings">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle>Settings</CardTitle>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

