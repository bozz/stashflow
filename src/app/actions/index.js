import uuid from 'uuid';

/*
 * action types
 */

export const GENERATE_DUMMY_DATA = 'GENERATE_DUMMY_DATA';
export const DELETE_ALL_DATA = 'DELETE_ALL_DATA';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const DELETE_TRANSACTION = 'DELETE_TRANSACTION';

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
  name: 'Null Transaction'
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
