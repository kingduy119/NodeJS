import React from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from '../components/Footer';

import TodoList from '../components/TodoList';
const todos = [
    {key: 1, text: '123', completed: false},
    {key: 1, text: '123', completed: false}
]


const App = () => (
    <div>
        <AddTodo/>
        {/* <TodoList todos={todos}/> */}
        <VisibleTodoList />
        {/* <Footer /> */}
    </div>
);

export default App;