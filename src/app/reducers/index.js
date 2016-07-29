import { combineReducers } from 'redux';
import uuid from 'uuid';

const transactions = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return [
        ...state,
        {
          id: uuid.v4(),
          name: 'New Transaction'
        }
      ];
    default:
      return state;
  }
};

const rootReducer = combineReducers({ transactions });

export default rootReducer;
