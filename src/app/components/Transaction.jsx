import React from 'react';
import { Panel } from 'react-bootstrap';

export default ({ id, name }) => (
  <Panel className="transaction">{name}</Panel>
);
