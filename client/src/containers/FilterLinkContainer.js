import { connect } from 'react-redux';
import { setVisibilityFilter } from '../store/actions/actions-todo';
import Link from '../components/Link';

const mapStateToProps = (state, filter) => ({
    active: filter === state.filter
});

const mapDispatchToProps = (dispatch, filter) => ({
    onClick: () => dispatch(setVisibilityFilter(filter))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);


