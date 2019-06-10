import axios from 'axios';

export const FETCH_ACCOUNTS = 'FETCH_ACCOUNTS';
export const FETCH_ACCOUNTS_SUCCESS = 'FETCH_ACCOUNTS_SUCCESS';
export const FETCH_ACCOUNTS_ERROR = 'FETCH_ACCOUNTS_ERROR';

// TODO: put this into some config file:
const apiHost = 'http://localhost:4000';

// Reducer:

const initialState = {
  isFetching: false,
  error: null,
  data: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOUNTS:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_ACCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case FETCH_ACCOUNTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }
    default:
      return state;
  }
}

// Action Creators:

export function fetchAccounts() {
  return function(dispatch) {
    dispatch({ type: FETCH_ACCOUNTS });

    axios.get(apiHost + '/accounts')
      .then(response => {
        dispatch({
          type: FETCH_ACCOUNTS_SUCCESS,
          payload: response.data.accounts
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_ACCOUNTS_ERROR,
          payload: err.response
        })
      })
  }
}
