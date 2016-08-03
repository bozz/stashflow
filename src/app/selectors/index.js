import { createSelector } from 'reselect';

const filtersSelector = state => state.filters;
const currentFilterKeySelector = state => state.ui.currentFilter;
export const currentFilterSelector = createSelector(
  filtersSelector,
  currentFilterKeySelector,
  (filters, currentFilterKey) => filters[currentFilterKey]
);

const transactionsSelector = state => state.transactions;
export const filteredTransactionsSelector = createSelector(
  transactionsSelector,
  currentFilterSelector,
  (transactions, filter) => {
    // check date range
    return transactions.filter(item => {
      let check = true;
      if (!item.date) return false;
      if (filter.dateFrom) {
        check = check && filter.dateFrom <= item.date;
      }
      if (filter.dateTo) {
        check = check && filter.dateTo >= item.date;
      }
      return check;
    });
  }
);

export const filteredTransactionsCountSelector = createSelector(
  filteredTransactionsSelector,
  transactions => transactions.length
);

const sortKeySelector = state => 'date';
export const filteredAndSortedTransactionsSelector = createSelector(
  filteredTransactionsSelector,
  sortKeySelector,
  (transactions, sortKey) => {
    return transactions.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return 1;
      } else if (a[sortKey] > b[sortKey]) {
        return -1;
      }
      return 0;
    });
  }
);
