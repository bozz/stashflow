import axios from 'axios';
import graphql from 'graphql.js';

const graph = graphql('http://localhost:4000/graphql', {
  alwaysAutodeclare: true,
  fragments: {
    transaction: 'on Transaction { id, name, type, date, amount, currency }'
  }
});

// graph.fragment({
//   transaction: 'on Transaction { id, name, type, date, amount, currency }'
// });


const FETCH_TRANSACTIONS = 'fetch_transactions';
const FETCH_TRANSACTIONS_SUCCESS = 'fetch_transactions_success';
const FETCH_TRANSACTIONS_ERROR = 'fetch_transactions_error';
const SORT_COLUMN = 'sort_column';

// Reducer:

const initialState = {
  transactions: [],
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
          transactions: action.payload.data.transactions,
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

    const query = graph.ql`query {
      transactions: getAllTransactions {
        ...transaction
      }
    }`;

    axios.post('http://localhost:4000/graphql', { query })
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

