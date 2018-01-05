import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterPanel from '../components/FilterPanel';

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    currentFilter: state.ui.currentFilter,
    filterFormExpanded: state.ui.filterFormExpanded
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFilterSelectChanged: (id) => {
      dispatch(actions.changeCurrentFilter(id));
    },
    onToggleFilterFormClick: () => {
      dispatch(actions.toggleFilterForm());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);