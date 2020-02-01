import { connect } from 'react-redux';
import {
    toggleTodo,
    VisibilityFilters
} from '../store/actions/actions-todo';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
    console.log(todos);
    switch(filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw 'Unknow filter: ' + filter;
    }
}


const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.filter)
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => {
        console.log(id);
        dispatch(toggleTodo(id));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList);