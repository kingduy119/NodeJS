import { connect }  from 'redux';
import { toggleTodo } from '../../../actions/IndexAction';
import TodoList from '../presentational/TodoListComponent';
import { VisibilityFilter } from '../../../actions/IndexAction';

const getVisibilityFilter = (todos, filter) => {
    switch(filter) {
        case VisibilityFilter.SHOW_ALL:
            return todos;
        case VisibilityFilter.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        case VisibilityFilter.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        default:
            return new Error('Unknow filter: ' + filter);
    }
}

const mapStateToProps = state => ({
    todos: getVisibilityFilter(state.todos, state.VisibilityFilter)
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);