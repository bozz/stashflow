import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default () => (
  <div id="filter-panel">
    <ContentWrapper>
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
    </ContentWrapper>
  </div>
);
