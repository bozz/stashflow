import React from 'react';
import classnames from 'classnames';
import ContentWrapper from './ContentWrapper';
import FilterSettings from './FilterSettings';
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';

export default ({ filters, currentFilter, filterSettingsExpanded,
  onFilterSelectChanged, onToggleFilterSettingsClick
}) => {
  const toggleSettingsLabel = filterSettingsExpanded ? 'Hide' : 'Expand';
  let filterSettings;
  if (filterSettingsExpanded) {
    filterSettings = <FilterSettings filter={filters[currentFilter]} />;
  }
  return (
    <div id="filter-panel">
      <ContentWrapper>
        <Form inline>
          <FormGroup controlId="filter-select">
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
          <button
            type="button"
            className="toggle-button pull-right"
            onClick={onToggleFilterSettingsClick}
          >
            {toggleSettingsLabel}
            {' '}
            <span
              className={classnames({
                glyphicon: true,
                'glyphicon-menu-down': !filterSettingsExpanded,
                'glyphicon-menu-up': filterSettingsExpanded
              })}
              aria-hidden="true"
            ></span>
          </button>
        </Form>
      </ContentWrapper>
      {filterSettings}
    </div>
  );
};
