import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import {
  fetchTransaction,
  saveTransaction,
} from '../../redux/transaction';

class Transaction extends React.Component {
  constructor(props) {
    super(props);

    this._accountId = this.props.match.params.accountId;
    this._transactionId = this.props.match.params.id;
    this.props.fetchTransaction(this._transactionId);

    this._currentAccount = this._getCurrentAccount(this._accountId);
  }

  _getCurrentAccount(accountId) {
    return this.props.accounts.find((account) => {
      return account.id === parseInt(accountId, 10);
    });
  }

  getAccountsOptions() {
    return this.props.accounts.map((account) => {
      return <option key={account.id} value={account.id}>{account.name}</option>
    });
  }

  getCategoriesOptions() {
    return this.props.categories.map((category) => {
      return <option key={category.id} value={category.id}>{category.name}</option>
    });
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;

    return (
      <Container fluid className="transaction-overview">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <Link className="breadcrumb-item" to="/accounts">Accounts</Link>
              <Link className="breadcrumb-item" to={"/accounts/" + this.props.data.accountId + "/transactions"}>{this._currentAccount.name}</Link>
              <BreadcrumbItem active tag="span">Transaction #{this._transactionId}</BreadcrumbItem>
            </Breadcrumb>

            <Card>
              <CardBody>
                <form onSubmit={handleSubmit(this.props.saveTransaction)}>
                  <Field name="id" component="input" type="hidden" />
                  <fieldset className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Account:</label>
                    <div className="col-sm-10">
                      <Field className="form-control form-control-sm" name="accountId" component="select">
                        {this.getAccountsOptions()}
                      </Field>
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Type:</label>
                    <div className="col-sm-10">
                      <Field className="form-control form-control-sm" name="type" component="select">
                        <option>Invoice</option>
                        <option>Cash Withdrawl</option>
                        <option>Account Transfer</option>
                        <option>SEPA Transfer</option>
                      </Field>
                    </div>
                  </fieldset>
                  <fieldset className="form-group row">
                    <label className="col-sm-2 col-form-label col-form-label-sm">Category:</label>
                    <div className="col-sm-10">
                      <Field className="form-control form-control-sm" name="categoryId" component="select">
                        {this.getCategoriesOptions()}
                      </Field>
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
                      <Field className="form-control form-control-sm" name="name" component="textarea" />
                    </div>
                  </fieldset>
                  <fieldset className="form-group">
                    <button action="submit" className="btn btn-sm btn-success float-right" disabled={pristine || submitting}>Save</button>
                  </fieldset>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect((state) => {
  return {
    ...state.transaction,
    initialValues: state.transaction.data,
    accounts: state.accounts.data,
    categories: state.categories.data
  }}, { fetchTransaction, saveTransaction } )(reduxForm({form: 'transaction', enableReinitialize: true})(Transaction)
);

