import React from 'react';
import moment from 'moment';
import Section from './Section';

export default (props) => {
  return (
    <Section id="fitler-settings">
      <p>Settings... {props.name}</p>
    </Section>
  );
};
