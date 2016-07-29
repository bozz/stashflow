import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default () => (
  <header>
    <Grid fluid>
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>stashflow</h1>
        </Col>
      </Row>
    </Grid>
  </header>
);
