import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import ReactTable from 'react-table';
import { UncontrolledAlert, Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import IconDelete from 'react-icons/lib/fa/close';
import IconEdit from 'react-icons/lib/fa/cog';
import {
  fetchTransactions,
  deleteTransaction
} from '../../redux/transactionList';


class TransactionList extends Component {
  constructor(props) {
    super(props);

    const currentAccountId = this.props.match.params.accountId;
    this._currentAccount = this.props.accounts.find((account) => {
      return account.id === parseInt(currentAccountId, 10);
    });
  }

  componentDidMount() {
    this._filterTransactions();
  }

  _getFetchParams(params = {}) {
    return Object.assign({
      page: this.props.page,
      pageSize: this.props.pageSize,
      sorted: this.props.sorted,
      filtered: this.props.filtered
    }, params);
  }

  _sortTransactions(sorted) {
    const params = this._getFetchParams({sorted})
    this.props.fetchTransactions(params);
  }

  _filterTransactions(filtered = {}) {
    const filterParams = [{accountId: this._currentAccount.id}];
    for (let key in filtered) {
      filterParams.push({[key]: filtered[key]});
    }
    const params = this._getFetchParams({filtered: filterParams})
    this.props.fetchTransactions(params);
  }

  _paginateTransactions(page) {
    const params = this._getFetchParams({page})
    this.props.fetchTransactions(params);
  }

  _updatePageSize(pageSize) {
    const params = this._getFetchParams({pageSize})
    this.props.fetchTransactions(params);
  }

  onClickDelete(row) {
    var result = confirm("Are you sure to delete transaction?");
    if (result) {
      this.props.deleteTransaction(row.id);
    }
  }

  render() {
    const columns = [{
      Header: 'ID',
      accessor: 'id',
      show: false
    }, {
      Header: 'Date',
      accessor: 'date',
      width: 120,
    }, {
      Header: 'AccountId',
      accessor: 'accountId',
      show: false
    }, {
      Header: 'Description',
      accessor: 'name'
    }, {
      Header: 'Category',
      sortable: false,
      accessor: 'category.name'
    }, {
      Header: 'Amount',
      accessor: 'amount',
      width: 80,
    }, {
      Header: 'Currency',
      accessor: 'currency',
      width: 80,
    }, {
      Header: 'Actions',
      sortable: false,
      width: 80,
      Cell: rowData => {
        return (
          <span className="row-actions">
            <Link className="edit" to={"/accounts/" + rowData.row.accountId + "/transactions/" + rowData.row.id}><IconEdit /></Link>
            <Button className="delete" color="danger" size="sm" onClick={() => this.onClickDelete(rowData.row)}><IconDelete /></Button>
          </span>
        );
      }
    }];

    const { handleSubmit } = this.props;

    return (
      <Container fluid className="transaction-overview">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <Link className="breadcrumb-item" to="/accounts">Accounts</Link>
              <BreadcrumbItem active tag="span">{this._currentAccount.name}</BreadcrumbItem>
            </Breadcrumb>

            <Card className="filter-options text-white" color="secondary">
              <form className="form-inline" onSubmit={handleSubmit(this._filterTransactions.bind(this))}>
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="search-query" className="sr-only">Search</label>
                  <Field className="form-control form-control-sm" name="query" component="input" type="text" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-primary btn-sm mb-2">Submit</button>
              </form>
            </Card>

            <Card>
              <CardBody>
                <ReactTable
                  manual
                  loading={this.props.isFetching}
                  data={this.props.transactions}
                  page={this.props.page}
                  pageSize={this.props.pageSize}
                  pages={this.props.pages}
                  sorted={this.props.sorted}
                  columns={columns}
                  onSortedChange={(newSorted, column, shiftKey) => {
                    this._sortTransactions(newSorted);
                  }}
                  onPageChange={page => {
                    this._paginateTransactions(page);
                  }}
                  onPageSizeChange={(pageSize, page) => {
                    this._updatePageSize(pageSize);
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  (state) => {
    const props = state.transactions;
    props.accounts = state.accounts.data;
    return props;
  },
  { fetchTransactions, deleteTransaction }
) (reduxForm({form: 'transactionListFilter'})(TransactionList));

