import React from 'react';
import classnames from 'classnames';
import Section from './Section';
import FilterSettings from './FilterSettings';
import Select from 'react-select';

export default ({ filters, currentFilter, filterSettingsExpanded,
  onFilterSelectChanged, onToggleFilterSettingsClick
}) => {
  const toggleSettingsLabel = filterSettingsExpanded ? 'Hide' : 'Expand';
  let filterSettings;
  if (filterSettingsExpanded) {
    filterSettings = <FilterSettings filter={filters[currentFilter]} />;
  }
  const options = Object.keys(filters).map(key => (
    { value: parseInt(key, 10), label: filters[key].name }
  ));
  return (
    <div id="filter-panel">
      <Section id="filter-toolbar">
        <label htmlFor="filter-select">Filter:</label>
        {' '}
        <Select
          name="filter-select"
          value={currentFilter}
          options={options}
          onChange={(opt) => onFilterSelectChanged(opt.value)}
          clearable={false}
        />
        <div className="controls">
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
        </div>
      </Section>
      {filterSettings}
    </div>
  );
};
