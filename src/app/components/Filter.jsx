import React from 'react';
import ContentRow from './ContentContainer';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default () => (
  <div id="filter-panel">
    <ContentRow>
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
    </ContentRow>
  </div>
);
