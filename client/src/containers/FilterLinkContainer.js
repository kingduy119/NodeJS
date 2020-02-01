import { connect } from 'react-redux';
import { 
    setVisibilityFilter,
    VisibilityFilters
} from '../store/actions/actions-todo';
import Link from '../components/Link';

const mapStateToProps = (state, ownProps) => ({
    active: false
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => {
        console.log(ownProps.filter);
        dispatch(setVisibilityFilter(ownProps.filter));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link);


