import axios from 'axios';

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
    case DELETE_TRANSACTION:
      return {
        ...state,
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
    case FETCH_TRANSACTIONS_ERROR:
    case DELETE_TRANSACTION_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case SET_FILTER:
      return {
        ...state,
        filtered: action.payload
      };
    case SORT_COLUMN:
      return {
        ...state,
        page: 0, // always goto first page on sort
        sorted: action.payload.sorted
      };
    case GOTO_PAGE:
      return {
        ...state,
        page: action.payload.page
      };
    case CHANGE_PAGESIZE:
      return {
        ...state,
        pageSize: action.payload.pageSize
      };
    default:
      return state;
  }
}

// Action Creators:

export function fetchTransactions() {
  return function(dispatch, getState) {
    dispatch({ type: FETCH_TRANSACTIONS });

    const state = getState();
    const params = {
      page: state.transactions.page,
      pageSize: state.transactions.pageSize,
      sorted: state.transactions.sorted,
      filtered: state.transactions.filtered
    };

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
      });
  };
}

export function deleteTransaction(id) {
  return function(dispatch) {
    dispatch({ type: DELETE_TRANSACTION });

    axios.delete(apiHost + '/transactions/' + id)
      .then((response) => {
        dispatch(fetchTransactions());
      })
      .catch((error) => {
        dispatch({
          type: DELETE_TRANSACTION_ERROR,
          payload: "Error deleting transaction: " + (error.response && error.response.data ? error.response.data.error : error.message)
        });
      });
  };
}

export function setFilter(filtered) {
  return {
    type: SET_FILTER,
    payload: filtered
  };
}

export function sortTransactions(sorted) {
  return function(dispatch) {
    dispatch({
      type: SORT_COLUMN,
      payload: { sorted }
    });

    dispatch(fetchTransactions());
  };
}

export function gotoPage(page) {
  return function(dispatch) {
    dispatch({
      type: GOTO_PAGE,
      payload: { page }
    });

    dispatch(fetchTransactions());
  };
}

export function changePageSize(pageSize) {
  return function(dispatch) {
    dispatch({
      type: CHANGE_PAGESIZE,
      payload: { pageSize }
    });

    dispatch(fetchTransactions());
  };
}

