import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import accountsReducer from './accounts';
import categoriesReducer from './categories';
import transactionsReducer from './transactions';

export default combineReducers({
  accounts: accountsReducer,
  categories: categoriesReducer,
  transactions: transactionsReducer,
  form: formReducer
});

