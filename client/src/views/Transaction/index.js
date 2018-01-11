import React from 'react';

class Transaction extends React.Component {
  render() {
    return (
      <div>
        <p>here come the transaction fields... {this.props.data.name}</p>
      </div>
    );
  }
}

export default Transaction;
