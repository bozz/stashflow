import React from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default () => (
  <div id="filter-panel">
    <Grid fluid>
      <Row>
        <Col md={6} mdOffset={3}>
          <Form inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Filter:</ControlLabel>
              {' '}
              <FormControl componentClass="select" placeholder="dashboard">
                <option value="dashboard">Dashboard</option>
                <option value="monthly">Monthly</option>
                <option value="other">...</option>
              </FormControl>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Grid>
  </div>
);
