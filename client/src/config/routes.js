import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Dashboard from '../views/pages/Dashboard';
import Accounts from '../views/pages/Accounts';
import Reports from '../views/pages/Reports';
import Settings from '../views/pages/Settings';
import TransactionList from '../views/pages/TransactionList';
import Transaction from '../views/pages/Transaction';
import NotFound from '../views/pages/NotFound';

export default () => (
  <Switch>
    <Route exact path="/" component={ Dashboard } />
    <Route path="/dashboard" component={ Dashboard } />
    <Route path="/accounts/:accountId/transactions/:id" component={ Transaction } />
    <Route path="/accounts/:accountId/transactions" component={ TransactionList } />
    <Route path="/accounts" component={ Accounts } />
    <Route path="/reports" component={ Reports } />
    <Route path="/settings" component={ Settings } />
    <Route path="*" component={ NotFound } />
  </Switch>
);
