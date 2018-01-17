import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../views/pages/Dashboard';
import Accounts from '../views/pages/Accounts';
import Reports from '../views/pages/Reports';
import Settings from '../views/pages/Settings';
import TransactionOverview from '../views/pages/TransactionOverview';
import NotFound from '../views/pages/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={ Dashboard } />
    <Route path="/dashboard" component={ Dashboard } />
    <Route path="/accounts/transactions" component={ TransactionOverview } />
    <Route path="/accounts" component={ Accounts } />
    <Route path="/reports" component={ Reports } />
    <Route path="/settings" component={ Settings } />
    <Route path="*" component={ NotFound } />
  </Switch>
);
