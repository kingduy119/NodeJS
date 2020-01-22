import { connect } from 'react-redux';
import { setVisibilityFilter } from '../../../actions/IndexAction';
import Link from '../presentational/LinkComponent';

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visiblityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => (dispatch(setVisibilityFilter(ownProps.filter)))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);