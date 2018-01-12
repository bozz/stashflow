import axios from 'axios';

const FETCH_TRANSACTIONS = 'fetch_transactions';
const FETCH_TRANSACTIONS_SUCCESS = 'fetch_transactions_success';
const FETCH_TRANSACTIONS_ERROR = 'fetch_transactions_error';
const SHOW_TRANSACTION = 'show_transaction';
const CLOSE_TRANSACTION = 'close_transaction';
const UPDATE_TRANSACTION = 'update_transaction';
const UPDATE_TRANSACTION_SUCCESS = 'update_transaction_success';
const UPDATE_TRANSACTION_ERROR = 'update_transaction_error';
const DELETE_TRANSACTION = 'delete_transaction';
const DELETE_TRANSACTION_ERROR = 'delete_transaction_error';
const SORT_COLUMN = 'sort_column';
const GOTO_PAGE = 'goto_page';
const CHANGE_PAGESIZE = 'change_pagesize';

// Reducer:

const initialState = {
  transactions: [],
  shownTransaction: null,
  page: 0,
  pageSize: 20,
  pages: -1,
  sorted: [{
    id: 'date',
    desc: true
  }],
  filter: [],
  isFetching: false,
  isSaving: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS:
    case DELETE_TRANSACTION:
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
          isFetching: false,
          error: null
        }
      );
    case FETCH_TRANSACTIONS_ERROR:
    case UPDATE_TRANSACTION_ERROR:
    case DELETE_TRANSACTION_ERROR:
      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          isSaving: false,
          error: action.payload
        }
      );
    case SHOW_TRANSACTION:
      return Object.assign(
        {},
        state,
        {
          shownTransaction: action.payload,
        }
      );
    case CLOSE_TRANSACTION:
      return Object.assign(
        {},
        state,
        {
          shownTransaction: null
        }
      );
    case UPDATE_TRANSACTION:
      return Object.assign(
        {},
        state,
        {
          isSaving: true
        }
      );
    case UPDATE_TRANSACTION_SUCCESS:
      return Object.assign(
        {},
        state,
        {
          isSaving: false,
          shownTransaction: null
        }
      );
    case SORT_COLUMN:
      return Object.assign(
        {},
        state,
        {
          page: 0, // always goto first page on sort
          sorted: action.payload.sorted
        }
      );
    case GOTO_PAGE:
      return Object.assign(
        {},
        state,
        {
          page: action.payload.page
        }
      );
    case CHANGE_PAGESIZE:
      return Object.assign(
        {},
        state,
        {
          pageSize: action.payload.pageSize
        }
      );
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
      page: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted,
      filtered: state.filtered
    };

    axios.get('http://localhost:4000/transactions', { params })
      .then((response) => {
        dispatch({
          type: FETCH_TRANSACTIONS_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: DELETE_TRANSACTION_ERROR,
          payload: error.response
        });
      });
  };
}

export function showTransaction(id) {
  return function(dispatch) {
    dispatch({
      type: SHOW_TRANSACTION,
      payload: id
    });
  };
}

export function closeTransaction() {
  return function(dispatch) {
    dispatch({
      type: CLOSE_TRANSACTION
    });
  };
}

export function updateTransaction(params) {
  return function(dispatch) {
    dispatch({ type: UPDATE_TRANSACTION });

    axios.post('http://localhost:4000/transactions/' + params.id, params)
      .then((response) => {
        dispatch({ type: UPDATE_TRANSACTION_SUCCESS });
        dispatch(fetchTransactions());
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_TRANSACTION_ERROR,
          payload: "Error updating transaction: " + (error.response ? error.response.data.error : error.message)
        });
      });
  };
}

export function deleteTransaction(id) {
  return function(dispatch) {
    dispatch({ type: DELETE_TRANSACTION });

    axios.delete('http://localhost:4000/transactions/' + id)
      .then((response) => {
        dispatch(fetchTransactions());
      })
      .catch((error) => {
        dispatch({
          type: DELETE_TRANSACTION_ERROR,
          payload: "Error deleting transaction: " + (error.response ? error.response.data.error : error.message)
        });
      });
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
