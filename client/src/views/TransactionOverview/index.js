import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from 'react-table';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import {
  fetchTransactions
  // sortColumn
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
              loading={this.props.isFetching}
              data={this.props.transactions}
              columns={columns}
              manual
            />
          </Col>
        </Row>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  console.log('STATE:::', state);
  return {
    isFetching: state.isFetching,
    transactions: state.transactions
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTransactions: params => dispatch(fetchTransactions(params))
    // sortColumn: (columnKey, dir) => dispatch(sortColumn(columnKey, dir))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionOverview);
