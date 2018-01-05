import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Motion, spring } from 'react-motion';
import moment from 'moment';
import * as actions from '../actions';
import Section from '../components/Section';
import SelectionComponent from '../components/SelectionComponent';

let FilterForm = (props) => {
  const { isExpanded, handleSubmit, pristine, submitting } = props;

  const accountOptions = [{ value: 'all', label: '[all]' }].concat(
    Object.keys(props.accounts).map(key => {
      return { value: props.accounts[key].id, label: props.accounts[key].name };
    })
  );

  const categoryOptions = [{ value: 'all', label: '[all]' }].concat(
    Object.keys(props.categories).map(key => {
      return { value: props.categories[key].id, label: props.categories[key].name };
    })
  );

  const viewOptions = Object.keys(props.dataViews).map(key => {
    return { value: props.dataViews[key].id, label: props.dataViews[key].name };
  });

  return (
    <Motion style={{ height: spring(isExpanded ? 300 : 0) }}>
      {({ height }) =>
        <Section id="filter-settings" style={{ height }}>
          <form className="pure-form pure-form-aligned" onSubmit={handleSubmit}>
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
                <label htmlFor="dateFrom">Date from</label>
                <Field name="dateFrom" component="input" type="date" />
                <span> to </span>
                <Field name="dateTo" component="input" type="date" />
              </div>

              <div className="pure-control-group">
                <label htmlFor="view">View</label>
                <Field name="view" component={SelectionComponent} options={viewOptions} />
              </div>

              <div className="pure-controls">
                <button type="submit" className="pure-button pure-button-primary" disabled={submitting}>Submit</button>
              </div>
            </fieldset>
          </form>
        </Section>
      }
    </Motion>
  );
};

// Decorate the form component
FilterForm = reduxForm({
  form: 'FilterForm',
  enableReinitialize: true
})(FilterForm);

const mapStateToProps = (state) => {
  return {
    accounts: state.accounts,
    categories: state.categories,
    dataViews: state.dataViews,
    initialValues: state.filters[state.ui.currentFilter]
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data) => {
      console.log('onSubmit: ', data);
      // dispatch(actions.changeCurrentFilter(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterForm);