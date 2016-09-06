
export const applyInitialState = (state) => {
  // Some sample initial data
  return Object.assign(state, {
    accounts: {
      1: { name: 'PrimoBank' },
      2: { name: 'SecundoBank' }
    },
    categories: {
      1: { name: 'Rent' },
      2: { name: 'Utilities' },
      3: { name: 'Insurance' },
      4: { name: 'Car' },
      5: { name: 'Phone' },
      6: { name: 'Groceries' },
      7: { name: 'Eating' },
      8: { name: 'Travel' }
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
        view: 'DashboardView',
      },
      2: {
        id: 2,
        name: 'Simple Sums',
        accounts: 'all',
        categories: 'all',
        query: 'foo',
        dateFrom: '2016-01-01',
        dateTo: '2016-08-01',
        view: 'SimpleSumsView',
      },
      3: {
        id: 3,
        name: 'Simple Sums Q1 2016',
        accounts: 'all',
        categories: 'all',
        dateFrom: '2016-01-01',
        dateTo: '2016-03-31',
        view: 'SimpleSumsView',
      }
    },
    ui: {
      currentFilter: 2,
      filterFormExpanded: false,
      soso: 'foo'
    }
  });
};
