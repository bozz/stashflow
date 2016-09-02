import React from 'react';
import classnames from 'classnames';
import Select from 'react-select';
import Section from './Section';
import FilterForm from '../containers/FilterForm';

export default ({ filters, currentFilter, filterFormExpanded,
  onFilterSelectChanged, onToggleFilterFormClick
}) => {
  const toggleSettingsLabel = filterFormExpanded ? 'Hide' : 'Expand';
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
            onClick={onToggleFilterFormClick}
          >
            {toggleSettingsLabel}
            {' '}
            <i
              className={classnames({
                fa: true,
                'fa-chevron-down': !filterFormExpanded,
                'fa-chevron-up': filterFormExpanded
              })}
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </Section>
      <FilterForm isExpanded={filterFormExpanded} />
    </div>
  );
};
