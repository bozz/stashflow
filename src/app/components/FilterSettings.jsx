import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Motion, spring } from 'react-motion';
import moment from 'moment';
import Section from './Section';
import SelectionComponent from './SelectionComponent';

// Decorate the form component
export default reduxForm({
  form: 'filterSettings'
})(
  ({ isExpanded, filter }) => {
    const accountOptions = [
      { value: 'all', label: 'all' }
    ];
    const categoryOptions = [
      { value: 'all', label: 'all' },
      { value: 'household', label: 'Household expenses' }
    ];

    return (
      <Motion style={{ height: spring(isExpanded ? 300 : 0) }}>
        {({ height }) =>
          <Section id="filter-settings" style={{ height }}>
            <form className="pure-form pure-form-aligned">
              <fieldset>
                <div className="pure-control-group">
                  <label htmlFor="query">Query</label>
                  <Field name="query" component="input" type="text" placeholder="query" />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="accounts">Accounts</label>
                  <Field name="accounts" component={SelectionComponent} options={accountOptions} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="categories">Categories</label>
                  <Field name="categories" component={SelectionComponent} options={categoryOptions} />
                </div>

                <div className="pure-control-group">
                  <label htmlFor="date-from">Date from</label>
                  <Field name="date-from" component="input" type="date" value={filter.dateFrom} />
                  <span> to </span>
                  <Field name="date-to" component="input" type="date" value={filter.dateTo} />
                </div>

                <div className="pure-controls">
                  <button type="submit" className="pure-button pure-button-primary">Submit</button>
                </div>
              </fieldset>
            </form>
          </Section>
        }
      </Motion>
    );
  }
);
