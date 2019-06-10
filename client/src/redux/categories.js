import axios from 'axios';

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_ERROR = 'FETCH_CATEGORIES_ERROR';

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
    case FETCH_CATEGORIES:
      return {
        ...state,
        isFetching: true
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      }
    case FETCH_CATEGORIES_ERROR:
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

export function fetchCategories() {
  return function(dispatch) {
    dispatch({ type: FETCH_CATEGORIES });

    axios.get(apiHost + '/categories')
      .then(response => {
        dispatch({
          type: FETCH_CATEGORIES_SUCCESS,
          payload: response.data.categories
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_CATEGORIES_ERROR,
          payload: err.response
        })
      })
  }
}
