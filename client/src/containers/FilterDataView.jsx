import React from 'react';
import { connect } from 'react-redux';
import { currentFilterSelector } from '../selectors';
import Section from '../components/Section';

import * as DataViews from './dataViews';

const DataViewContainer = ({ filter }) => {
  const View = DataViews[filter.view];
  const currentView = View ? <View /> : false;
  return (
    <Section id="filter-data-view">
      {currentView}
    </Section>
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
