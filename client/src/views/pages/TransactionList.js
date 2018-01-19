import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTable from 'react-table';
import { UncontrolledAlert, Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardHeader, CardBody, CardTitle, Button } from 'reactstrap';
import IconDelete from 'react-icons/lib/fa/close';
import IconEdit from 'react-icons/lib/fa/cog';
import {
  fetchTransactions,
  deleteTransaction,
  sortTransactions,
  setFilter,
  gotoPage,
  changePageSize
} from '../../redux/transactionList';


class TransactionList extends Component {
  constructor(props) {
    super(props);

    const currentAccountId = this.props.match.params.accountId;
    this.props.setFilter([{ accountId: currentAccountId }]);
    this._currentAccount = this.props.accounts.find((account) => {
      return account.id == currentAccountId;
    });
  }

  componentDidMount() {
    this.props.fetchTransactions();
  }

  checkAndDisplayErrors() {
    if (this.props.error) {
      return (
        <UncontrolledAlert color="danger">{this.props.error}</UncontrolledAlert>
      )
    }
  }

  // checkAndDisplayTransaction() {
  //   if (this.props.shownTransaction) {
  //     const transactionData = this.props.transactions.find(item => {
  //       return item.id === this.props.shownTransaction;
  //     });

  //     return (
  //       <Modal
  //         className="transaction-modal"
  //         title="Edit Transaction"
  //         isOpen={true}
  //         backdrop="static"
  //         toggle={this.props.closeTransaction}
  //       >
  //         <TransactionView initialValues={transactionData} saveTransaction={this.props.updateTransaction} />
  //       </Modal>
  //     )
  //   }
  // }

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

    return (
      <Container fluid className="transaction-overview">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <Link className="breadcrumb-item" to="/accounts">Accounts</Link>
              <BreadcrumbItem active tag="span">{this._currentAccount.name}</BreadcrumbItem>
            </Breadcrumb>

            <Card className="filter-options text-white" color="secondary">
              <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                  <label htmlFor="search-query" className="sr-only">Search</label>
                  <input type="text" className="form-control form-control-sm" id="search-query" placeholder="Search" />
                </div>
                <button type="submit" className="btn btn-primary btn-sm mb-2">Submit</button>
              </form>
            </Card>

            {this.checkAndDisplayErrors()}

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
                    this.props.sortTransactions(newSorted);
                  }}
                  onPageChange={page => {
                    this.props.gotoPage(page);
                  }}
                  onPageSizeChange={(pageSize, page) => {
                    this.props.changePageSize(pageSize);
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
    props.accounts = state.accounts.accounts;
    return props;
  },
  {
    fetchTransactions,
    deleteTransaction,
    sortTransactions,
    setFilter,
    gotoPage,
    changePageSize
  }
)(TransactionList);

