import React from 'react';
import { reduxForm, Field } from 'redux-form';

class Transaction extends React.Component {
  render() {
    const { handleSubmit, pristine, submitting, saveTransaction } = this.props;

    return (
      <form onSubmit={handleSubmit(saveTransaction)}>
        <Field name="id" component="input" type="hidden" />
        <fieldset className="form-group row">
          <label className="col-sm-2 col-form-label col-form-label-sm">Account:</label>
          <div className="col-sm-10">
            <Field className="form-control form-control-sm" name="accountId" component="input" type="text" />
          </div>
        </fieldset>
        <fieldset className="form-group row">
          <label className="col-sm-2 col-form-label col-form-label-sm">Category:</label>
          <div className="col-sm-10">
            <Field className="form-control form-control-sm" name="categoryId" component="input" type="text" />
          </div>
        </fieldset>
        <fieldset className="form-group row">
          <label className="col-sm-2 col-form-label col-form-label-sm">Date:</label>
          <div className="col-sm-10">
            <Field className="form-control form-control-sm" name="date" component="input" type="date" />
          </div>
        </fieldset>
        <fieldset className="form-group row">
          <label className="col-sm-2 col-form-label col-form-label-sm">Amount:</label>
          <div className="col-sm-10">
            <Field className="form-control form-control-sm" name="amount" component="input" type="text" />
          </div>
        </fieldset>
        <fieldset className="form-group row">
          <label className="col-sm-2 col-form-label col-form-label-sm">Description:</label>
          <div className="col-sm-10">
            <Field className="form-control form-control-sm" name="name" component="input" type="textarea" />
          </div>
        </fieldset>
        <fieldset className="form-group">
          <button action="submit" className="btn btn-sm btn-success float-right" disabled={pristine || submitting}>Save</button>
        </fieldset>
      </form>
    );
  }
}

export default reduxForm({ form: 'transaction' })(Transaction);

