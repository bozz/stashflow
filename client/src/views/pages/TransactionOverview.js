import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { UncontrolledAlert, Container, Row, Col, Jumbotron, Button } from 'reactstrap';
import IconDelete from 'react-icons/lib/fa/close';
import IconEdit from 'react-icons/lib/fa/cog';
import {
  fetchTransactions,
  showTransaction,
  closeTransaction,
  deleteTransaction,
  sortTransactions,
  gotoPage,
  changePageSize
} from '../../redux/transactions';

import Modal from '../components/Modal';
import TransactionView from '../components/Transaction';


class TransactionOverview extends Component {
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

  checkAndDisplayTransaction() {
    if (this.props.shownTransaction) {
      const transactionData = this.props.transactions.find(item => {
        return item.id === this.props.shownTransaction;
      });
      return (
        <Modal
          className="transaction-modal"
          title="Edit Transaction"
          isOpen={true}
          backdrop="static"
          toggle={this.props.closeTransaction}
        >
          <TransactionView data={transactionData} />
        </Modal>
      )
    }
  }

  onClickEdit(row) {
    this.props.showTransaction(row.id);
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
    }, {
      Header: 'Account',
      sortable: false,
      accessor: 'account.name'
    }, {
      Header: 'Description',
      accessor: 'name'
    }, {
      Header: 'Category',
      sortable: false,
      accessor: 'category.name'
    }, {
      Header: 'Amount',
      accessor: 'amount'
    }, {
      Header: 'Currency',
      accessor: 'currency'
    }, {
      Header: 'Actions',
      sortable: false,
      Cell: rowData => {
        return (
          <span className="row-actions">
            <Button className="edit" color="secondary" size="sm" onClick={() => this.onClickEdit(rowData.row)}><IconEdit /></Button>
            <Button className="delete" color="danger" size="sm" onClick={() => this.onClickDelete(rowData.row)}><IconDelete /></Button>
          </span>
        );
      }
    }];

    return (
      <Container className="transaction-overview">
        <Row>
          <Col>
            <Jumbotron>
              <h1>Transactions</h1>
              <p>This is where all transactions will be listed...</p>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col>
            {this.checkAndDisplayErrors()}
            <ReactTable
              manual
              loading={this.props.isFetching}
              data={this.props.transactions}
              page={this.props.page}
              pageSize={this.props.pageSize}
              pages={this.props.pages}
              sorted={this.props.sorted}
              filtered={this.props.filtered}
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
          </Col>
        </Row>
        {this.checkAndDisplayTransaction()}
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    isFetching: state.isFetching,
    transactions: state.transactions,
    shownTransaction: state.shownTransaction,
    page: state.page,
    pageSize: state.pageSize,
    pages: state.pages,
    sorted: state.sorted,
    filtered: state.filtered,
    error: state.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: params => dispatch(fetchTransactions(params)),
    showTransaction: id => dispatch(showTransaction(id)),
    closeTransaction: () => dispatch(closeTransaction()),
    deleteTransaction: id => dispatch(deleteTransaction(id)),
    sortTransactions: sorted => dispatch(sortTransactions(sorted)),
    gotoPage: page => dispatch(gotoPage(page)),
    changePageSize: pageSize => dispatch(changePageSize(pageSize)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionOverview);

