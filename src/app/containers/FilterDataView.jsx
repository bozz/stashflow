import React from 'react';
import { connect } from 'react-redux';
import ContentWrapper from '../components/ContentWrapper';
import SimpleSumsView from './dataViews/SimpleSumsView';

const DataViewContainer = (props) => (
  <section id="data-view-container">
    <ContentWrapper>
      <SimpleSumsView {...props} />
    </ContentWrapper>
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
