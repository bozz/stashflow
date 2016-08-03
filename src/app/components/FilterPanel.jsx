import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default ({ filters, currentFilter, onFilterSelectChanged }) => (
  <div id="filter-panel">
    <ContentWrapper>
      <Form inline>
        <FormGroup controlId="formInlineName">
          <ControlLabel>Filter:</ControlLabel>
          {' '}
          <FormControl
            componentClass="select"
            placeholder="dashboard"
            value={currentFilter}
            onChange={(e) => onFilterSelectChanged(e.target.value)}
          >
            {Object.keys(filters).map(key => (
              <option key={key} value={key}>{filters[key].name}</option>
            ))}
            <option value="other">...</option>
          </FormControl>
        </FormGroup>
      </Form>
    </ContentWrapper>
  </div>
);
