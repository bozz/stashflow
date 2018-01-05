import axios from 'axios';

const FETCH_TRANSACTIONS = 'fetch_transactions';
const FETCH_TRANSACTIONS_SUCCESS = 'fetch_transactions_success';
const FETCH_TRANSACTIONS_ERROR = 'fetch_transactions_error';
const SORT_COLUMN = 'sort_column';

// Reducer:

const initialState = {
  transactions: [],
  pages: -1,
  orderBy: [{
    id: 'date',
    desc: true
  }],
  filter: [],
  isFetching: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return Object.assign(
        {},
        state,
        {
          isFetching: true
        }
      );
    case FETCH_TRANSACTIONS_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          transactions: action.payload.transactions,
          pages: action.payload.pages,
          isFetching: false
        }
      );
    case SORT_COLUMN:
      return Object.assign(
        {},
        state,
        {
          orderBy: [{
            id: action.payload.columnKey,
            desc: action.payload.dir === 'desc'
          }]
        }
      );
    default:
      return state;
  }
}

// Action Creators:

export function fetchTransactions(params = {}) {
  return function(dispatch) {
    dispatch({ type: FETCH_TRANSACTIONS });

    axios.get('http://localhost:4000/transactions', { params })
      .then((response) => {
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          payload: response.data
        });
      });
  };
}

export function sortColumn(columnKey, dir) {
  return {
    type: SORT_COLUMN,
    payload: { columnKey, dir }
  };
}

