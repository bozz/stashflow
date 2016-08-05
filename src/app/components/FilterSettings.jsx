import React from 'react';
import moment from 'moment';
import Section from './Section';

export default ({ filter }) => {
  return (
    <Section id="filter-settings">
      <p>Settings... {filter.name}</p>
    </Section>
  );
};
