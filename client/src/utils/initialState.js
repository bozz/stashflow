
export const applyInitialState = (state) => {
  // Some sample initial data
  return Object.assign(state, {
    accounts: {
      1: { id: 1, name: 'PrimoBank' },
      2: { id: 2, name: 'SecundoBank' }
    },
    categories: {
      1: { id: 1, name: 'Rent' },
      2: { id: 2, name: 'Utilities' },
      3: { id: 3, name: 'Insurance' },
      4: { id: 4, name: 'Car' },
      5: { id: 5, name: 'Phone' },
      6: { id: 6, name: 'Groceries' },
      7: { id: 7, name: 'Eating' },
      8: { id: 8, name: 'Travel' }
    },
    dataViews: {
      1: { id: 1, name: 'DashboardView' },
      2: { id: 2, name: 'SimpleSumsView' }
    },
    filters: {
      1: {
        id: 1,
        name: 'Dashboard',
        accounts: 'all',
        categories: 'all',
        tags: ['all'],
        query: '',
        dateFrom: '2016-01-01',
        dateTo: '2016-08-01',
        amountFrom: 0,
        amountTo: 5000,
        view: 1,
      },
      2: {
        id: 2,
        name: 'Simple Sums',
        accounts: 'all',
        categories: 'all',
        query: 'foo',
        dateFrom: '2016-01-01',
        dateTo: '2016-08-01',
        view: 2,
      },
      3: {
        id: 3,
        name: 'Simple Sums Q1 2016',
        accounts: 'all',
        categories: 'all',
        dateFrom: '2016-01-01',
        dateTo: '2016-03-31',
        view: 2,
      }
    },
    ui: {
      currentFilter: 2,
      filterFormExpanded: false
    }
  });
};
