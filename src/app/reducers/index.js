import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const transactions = (state = [], action) => {
  switch (action.type) {
    case 'DELETE_ALL_DATA':
      return [];
    case 'ADD_TRANSACTION':
      return [
        ...state,
        action.data
      ];
    case 'DELETE_TRANSACTION':
      return state.filter(transaction => transaction.id !== action.id);
    default:
      return state;
  }
};

const filters = (state = {}, action) => {
  return state;
};

const ui = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_FILTER':
      return {
        ...state,
        currentFilter: parseInt(action.id, 10)
      };
    case 'TOGGLE_FILTER_FORM':
      return {
        ...state,
        filterFormExpanded: !state.filterFormExpanded
      };
    default:
      return state;
  }
};

export default combineReducers({
  transactions,
  filters,
  ui,
  form: formReducer
});
