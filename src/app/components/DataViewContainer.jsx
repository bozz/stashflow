import React from 'react';
import { connect } from 'react-redux';
import ContentRow from './ContentContainer';
import SimpleSumsView from './dataViews/SimpleSumsView';

const DataViewContainer = (props) => (
  <section id="data-view-container">
    <ContentRow>
      <SimpleSumsView {...props} />
    </ContentRow>
  </section>
);

const mapStateToProps = (state) => {
  return {
    transactions: state.transactions
  };
};

export default connect(
  mapStateToProps
)(DataViewContainer);
