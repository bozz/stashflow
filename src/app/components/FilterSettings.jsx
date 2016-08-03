import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Button } from 'react-bootstrap';
import moment from 'moment';

export default (props) => {
  return (
    <ContentWrapper>
      <div id="filter-settings">Settings... {props.name}</div>
    </ContentWrapper>
  );
};
