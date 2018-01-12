import React from 'react';
import { reduxForm, Field } from 'redux-form';

class Transaction extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting, saveTransaction } = this.props;

    return (
      <form onSubmit={handleSubmit(saveTransaction)}>
        <Field name="id" component="input" type="hidden" />
        <fieldset className="form-group">
          <label>Account:</label>
          <Field className="form-control" name="accountId" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Category:</label>
          <Field className="form-control" name="categoryId" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Date:</label>
          <Field className="form-control" name="date" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Amount:</label>
          <Field className="form-control" name="amount" component="input" type="text" />
        </fieldset>
        <fieldset className="form-group">
          <label>Description:</label>
          <Field className="form-control" name="name" component="input" type="textarea" />
        </fieldset>
        <button action="submit" className="btn btn-primary" disabled={pristine || submitting}>Save</button>
      </form>
    );
  }
}

export default reduxForm({ form: 'transaction' })(Transaction);

