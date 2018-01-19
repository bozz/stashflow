import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import accountsReducer from './accounts';
import categoriesReducer from './categories';
import transactionListReducer from './transactionList';
import transactionReducer from './transaction';

export default combineReducers({
  accounts: accountsReducer,
  categories: categoriesReducer,
  transactions: transactionListReducer,
  transaction: transactionReducer,
  form: formReducer
});

