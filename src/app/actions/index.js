import uuid from 'uuid';
import moment from 'moment';

/*
 * action types
 */

export const GENERATE_DUMMY_DATA = 'GENERATE_DUMMY_DATA';
export const DELETE_ALL_DATA = 'DELETE_ALL_DATA';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

export const CHANGE_CURRENT_FILTER = 'CHANGE_CURRENT_FILTER';

/*
 * other constants
 */

// export const VisibilityFilters = {
//   SHOW_ALL: 'SHOW_ALL',
//   SHOW_COMPLETED: 'SHOW_COMPLETED',
//   SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

/*
 * action creators
 */

export function generateDummyData() {
  return { type: GENERATE_DUMMY_DATA };
}

export function deleteAllData() {
  return { type: DELETE_ALL_DATA };
}

export function addTransaction(props = {
  name: '<empty>',
  date: moment().format('YYYY-MM-DD')
}) {
  return {
    type: ADD_TRANSACTION,
    data: {
      id: uuid.v4(),
      ...props
    }
  };
}

export function deleteTransaction(id) {
  return { type: DELETE_TRANSACTION, id };
}

export function changeCurrentFilter(id) {
  return { type: CHANGE_CURRENT_FILTER, id };
}
