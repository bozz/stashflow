import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import transactionsReducer from './transactions';

export default combineReducers({
  form: formReducer,
  transactions: transactionsReducer
});

