import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import {
  fetchTransactions,
  sortTransactions,
  gotoPage,
  changePageSize
} from '../../redux/transactions';


class TransactionOverview extends Component {
  componentDidMount() {
    this.props.fetchTransactions();
  }

  getTransactionRows() {
    return this.props.transactions.map((transaction) => {
      return (
        <tr key={transaction.id}>
          <td>{transaction.name}</td>
          <td>{transaction.date}</td>
          <td>{transaction.amount}</td>
        </tr>
      );
    });
  }

  render() {
    const columns = [{
      Header: 'Name',
      accessor: 'name'
    }, {
      Header: 'Date',
      accessor: 'date',
    }, {
      Header: 'Amount',
      accessor: 'amount'
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
      </Container>
    );
  }
}


function mapStateToProps(state) {
  return {
    isFetching: state.isFetching,
    transactions: state.transactions,
    page: state.page,
    pageSize: state.pageSize,
    pages: state.pages,
    sorted: state.sorted,
    filtered: state.filtered
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: params => dispatch(fetchTransactions(params)),
    sortTransactions: sorted => dispatch(sortTransactions(sorted)),
    gotoPage: page => dispatch(gotoPage(page)),
    changePageSize: pageSize => dispatch(changePageSize(pageSize)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionOverview);

