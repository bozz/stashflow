import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { UncontrolledAlert, Container, Row, Col, Breadcrumb, BreadcrumbItem, Card, CardBody, CardTitle, Button } from 'reactstrap';
import IconDelete from 'react-icons/lib/fa/close';
import IconEdit from 'react-icons/lib/fa/cog';
import {
  fetchTransactions,
  showTransaction,
  closeTransaction,
  updateTransaction,
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
          <TransactionView initialValues={transactionData} saveTransaction={this.props.updateTransaction} />
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
      <Container fluid className="transaction-overview">
        <Row>
          <Col>
            <Breadcrumb tag="nav">
              <BreadcrumbItem tag="a" href="/accounts">Accounts</BreadcrumbItem>
              <BreadcrumbItem active tag="span">Bank A</BreadcrumbItem>
            </Breadcrumb>

            {this.checkAndDisplayErrors()}

            <Card>
              <CardBody>
                <CardTitle>Transactions</CardTitle>
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
              </CardBody>
            </Card>
          </Col>
        </Row>
        {this.checkAndDisplayTransaction()}
      </Container>
    );
  }
}

export default connect(
  (state) => state.transactions,
  {
    fetchTransactions,
    showTransaction,
    closeTransaction,
    updateTransaction,
    deleteTransaction,
    sortTransactions,
    gotoPage,
    changePageSize
  }
)(TransactionOverview);

