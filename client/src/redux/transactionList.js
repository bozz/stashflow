import axios from 'axios';
import notify from '../utils/notifications';

export const FETCH_TRANSACTIONS = 'fetch_transactions';
export const FETCH_TRANSACTIONS_SUCCESS = 'fetch_transactions_success';
export const FETCH_TRANSACTIONS_ERROR = 'fetch_transactions_error';
export const DELETE_TRANSACTION = 'delete_transaction';
export const DELETE_TRANSACTION_ERROR = 'delete_transaction_error';
export const SET_FILTER = 'set_filter';
export const SORT_COLUMN = 'sort_column';
export const GOTO_PAGE = 'goto_page';
export const CHANGE_PAGESIZE = 'change_pagesize';

// TODO: put this into some config file:
const apiHost = 'http://localhost:4000';

// Reducer:

const initialState = {
  transactions: [],
  page: 0,
  pageSize: 20,
  pages: -1,
  sorted: [{
    id: 'date',
    desc: true
  }],
  filtered: [],
  isFetching: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
      return {
        ...state,
        ...action.payload,
        isFetching: true
      };
    case FETCH_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        transactions: action.payload.transactions,
        pages: action.payload.pages,
        isFetching: false,
        error: null
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_TRANSACTIONS_ERROR:
    case DELETE_TRANSACTION_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    default:
      return state;
  }
}

// Action Creators:

export function fetchTransactions(params) {
  return function(dispatch, getState) {
    if (!params) {
      const state = getState();
      params = {
        page: state.transactions.page,
        pageSize: state.transactions.pageSize,
        sorted: state.transactions.sorted,
        filtered: state.transactions.filtered
      }
    }

    dispatch({
      type: FETCH_TRANSACTIONS,
      payload: params
    });

    return axios.get(apiHost + '/transactions', { params })
      .then((response) => {
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TRANSACTIONS_ERROR,
          payload: error.response
        });
        dispatch(notify.error(error, 'Fetch Transactions Error'));
      });
  };
}

export function deleteTransaction(id) {
  return function(dispatch) {
    dispatch({ type: DELETE_TRANSACTION });

    axios.delete(apiHost + '/transactions/' + id)
      .then((response) => {
        dispatch(fetchTransactions());
        dispatch(notify.success('Transaction deleted successfully'));
      })
      .catch((error) => {
        dispatch({
          type: DELETE_TRANSACTION_ERROR,
          payload: "Error deleting transaction: " + (error.response && error.response.data ? error.response.data.error : error.message)
        });
        dispatch(notify.error('Transaction delete failed'));
      });
  };
}

