import axios from 'axios';
import {reset} from 'redux-form';
import notify from '../utils/notifications';

export const FETCH_TRANSACTION = 'fetch_transaction';
export const FETCH_TRANSACTION_SUCCESS = 'fetch_transaction_success';
export const FETCH_TRANSACTION_ERROR = 'fetch_transaction_error';
export const SAVE_TRANSACTION = 'update_transaction';
export const SAVE_TRANSACTION_SUCCESS = 'update_transaction_success';
export const SAVE_TRANSACTION_ERROR = 'update_transaction_error';

// TODO: put this into some config file:
const apiHost = 'http://localhost:4000';

// Reducer:

const initialState = {
  data: {},
  isFetching: false,
  isSaving: false,
  error: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
        error: null
      };
    case FETCH_TRANSACTION_ERROR:
    case SAVE_TRANSACTION_ERROR:
      return {
        ...state,
        isFetching: false,
        isSaving: false,
        error: action.payload
      };
    case SAVE_TRANSACTION:
      return {
        ...state,
        isSaving: true
      };
    case SAVE_TRANSACTION_SUCCESS:
      return {
        ...state,
        isSaving: false
      };
    default:
      return state;
  }
}

// Action Creators:

export function fetchTransaction(id) {
  return function(dispatch, getState) {
    dispatch({ type: FETCH_TRANSACTION });

    return axios.get(apiHost + '/transactions/' + id)
      .then((response) => {
        dispatch({
          type: FETCH_TRANSACTION_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: FETCH_TRANSACTION_ERROR,
          payload: error.response
        });
      });
  };
}

export function saveTransaction(params) {
  return function(dispatch) {
    dispatch({ type: SAVE_TRANSACTION });

    return axios.post(apiHost + '/transactions/' + params.id, params)
      .then((response) => {
        dispatch({ type: SAVE_TRANSACTION_SUCCESS });
        dispatch( reset('transaction') );
        dispatch( notify.success('Transaction saved successfully') );
      })
      .catch((error) => {
        dispatch({
          type: SAVE_TRANSACTION_ERROR,
          payload: "Error saving transaction: " + (error.response && error.response.data ? error.response.data.error : error.message)
        });
        dispatch( notify.error('Transaction failed to save') );
      });
  };
}

