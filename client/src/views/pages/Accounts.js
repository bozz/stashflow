import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle } from 'reactstrap';

class Accounts extends Component {
  getAccountComponents() {
    return this.props.accounts.map((account) => {
      return <p key={account.id}><Link to={"/accounts/" + account.id + "/transactions"}>{account.name}</Link></p>
    });
  }

  render() {
    return (
      <Container fluid className="dashboard">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <BreadcrumbItem active tag="span">Accounts</BreadcrumbItem>
            </Breadcrumb>
            <Card>
              <CardBody>
                <CardTitle>Accounts</CardTitle>
                {this.getAccountComponents()}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect((state) => state.accounts)(Accounts);

