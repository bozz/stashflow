import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import Section from './Section';
import FilterSettings from './FilterSettings';

export default ({ filters, currentFilter, filterSettingsExpanded,
  onFilterSelectChanged, onToggleFilterSettingsClick
}) => {
  const toggleSettingsLabel = filterSettingsExpanded ? 'Hide' : 'Expand';
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
            <i
              className={classnames({
                fa: true,
                'fa-chevron-down': !filterSettingsExpanded,
                'fa-chevron-up': filterSettingsExpanded
              })}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </Section>
      <FilterSettings isExpanded={filterSettingsExpanded} filter={filters[currentFilter]} />
    </div>
  );
};
