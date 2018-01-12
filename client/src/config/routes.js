import React from 'react';
import { Route, Switch } from 'react-router-dom';

import TransactionOverview from '../views/pages/TransactionOverview';
import NotFound from '../views/pages/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={ TransactionOverview } />
    <Route path="*" component={ NotFound } />
  </Switch>
);
