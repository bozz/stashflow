import { combineReducers } from 'redux';

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

const rootReducer = combineReducers({ transactions });

export default rootReducer;
