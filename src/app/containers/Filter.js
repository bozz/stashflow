import { connect } from 'react-redux';
import * as actions from '../actions';
import FilterPanel from '../components/FilterPanel';

const mapStateToProps = (state) => {
  return {
    filters: state.filters,
    currentFilter: state.ui.currentFilter,
    filterSettingsExpanded: state.ui.filterSettingsExpanded
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFilterSelectChanged: (id) => {
      dispatch(actions.changeCurrentFilter(id));
    },
    onToggleFilterSettingsClick: () => {
      dispatch(actions.toggleFilterSettings());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterPanel);
