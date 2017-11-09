import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TransactionOverview from '../views/TransactionOverview';
import NotFound from '../views/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={ TransactionOverview } />
    <Route path="*" component={ NotFound } />
  </Switch>
);
