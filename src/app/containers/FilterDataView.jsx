import React from 'react';
import { connect } from 'react-redux';
import { currentFilterSelector } from '../selectors';
import ContentWrapper from '../components/ContentWrapper';

import * as DataViews from './dataViews';

const DataViewContainer = ({ filter }) => {
  const View = DataViews[filter.view];
  const currentView = View ? <View /> : false;
  return (
    <section id="data-view-container">
      <ContentWrapper>
        {currentView}
      </ContentWrapper>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: currentFilterSelector(state)
  };
};

export default connect(
  mapStateToProps
)(DataViewContainer);
