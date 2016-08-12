import React from 'react';
import { Motion, spring } from 'react-motion';
import moment from 'moment';
import Section from './Section';

export default ({ isExpanded, filter }) => {
  return (
    <Motion style={{ height: spring(isExpanded ? 200 : 0) }}>
      {({ height }) =>
        <Section id="filter-settings" style={{ height }}>
          <p styles="margin-top: 8px;">Settings... {filter.name}</p>
        </Section>
      }
    </Motion>
  );
};
