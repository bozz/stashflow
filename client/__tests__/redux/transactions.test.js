
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import * as actions from '../../src/redux/transactions';

const transactionsMock = {
  transactions: [{
    id: 1,
    accountId: 1,
    categoryId: 2,
    date: '2018-01-01',
    name: 'transaction1'
  }]
}

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

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Transaction Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('creates FETCH_TRANSACTIONS_SUCCESS after fetching transactions', async () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: transactionsMock,
      });
    });

    const expectedActions = [
      { type: actions.FETCH_TRANSACTIONS },
      { type: actions.FETCH_TRANSACTIONS_SUCCESS, payload: transactionsMock },
    ];

    await store.dispatch(actions.fetchTransactions());

    expect(store.getActions()).toEqual(expectedActions);
  });


  it('creates FETCH_TRANSACTIONS_ERROR after failed at fetching transactions', async () => {
    const store = mockStore({});
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 500
      });
    });

    await store.dispatch(actions.fetchTransactions());

    const storeActions = store.getActions();
    expect(storeActions.length).toBe(2);
    expect(storeActions[0].type).toEqual(actions.FETCH_TRANSACTIONS);
    expect(storeActions[1].type).toEqual(actions.FETCH_TRANSACTIONS_ERROR);
  });


  it('creates SHOW_TRANSACTION for showing a transaction', async () => {
    const store = mockStore({});

    const transactionId = 23;
    await store.dispatch(actions.showTransaction(transactionId));

    const storeActions = store.getActions();
    expect(storeActions.length).toBe(1);
    expect(storeActions[0].type).toEqual(actions.SHOW_TRANSACTION);
    expect(storeActions[0].payload).toBe(transactionId);
  });


  it('creates CLOSE_TRANSACTION for closing a transaction', async () => {
    const store = mockStore({});

    await store.dispatch(actions.closeTransaction());

    const storeActions = store.getActions();
    expect(storeActions.length).toBe(1);
    expect(storeActions[0].type).toEqual(actions.CLOSE_TRANSACTION);
    expect(storeActions[0].payload).toBeUndefined();
  });


  it('creates UPDATE_TRANSACTION_SUCCESS for updating a transaction', async () => {
    const store = mockStore({});
    moxios.stubRequest('http://localhost:4000/transactions/111', {
      status: 200
    });

    const expectedActions = [
      { type: actions.UPDATE_TRANSACTION },
      { type: actions.UPDATE_TRANSACTION_SUCCESS },
      { type: actions.FETCH_TRANSACTIONS }
      // { type: actions.FETCH_TRANSACTIONS_SUCCESS, transactionsMock },
    ];

    await store.dispatch(actions.updateTransaction({ id: 111 }));

    expect(store.getActions()).toEqual(expectedActions);
  });


  it('creates UPDATE_TRANSACTION_ERROR for failing to update a transaction', async () => {
    const store = mockStore({});
    moxios.stubRequest('http://localhost:4000/transactions/111', {
      status: 500
    });

    const expectedActions = [
      { type: actions.UPDATE_TRANSACTION },
      { type: actions.UPDATE_TRANSACTION_ERROR }
    ];

    await store.dispatch(actions.updateTransaction({ id: 111 }));

    const storeActions = store.getActions();
    expect(storeActions.length).toEqual(2);
    expect(storeActions[0].type).toEqual(actions.UPDATE_TRANSACTION);
    expect(storeActions[1].type).toEqual(actions.UPDATE_TRANSACTION_ERROR);
  });
});


describe('Transactions Reducer', () => {
  it('should return the initial state', () => {
    expect(actions.default(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_TRANSACTIONS', () => {
    const fetchAction = { type: actions.FETCH_TRANSACTIONS };
    const expectedState = {
      ...initialState,
      isFetching: true
    }
    expect(actions.default(undefined, fetchAction)).toEqual(expectedState);
  });
});


