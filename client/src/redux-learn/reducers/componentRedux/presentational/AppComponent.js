import React from 'react';
import AddTodo from '../container/AddTodo';
import VisibilityTodoList from '../container/VisibilityTodoList';
import Footer from './FooterComponent';

const App = () => (
    <div>
        <AddTodo/>
        <VisibilityTodoList/>
        <Footer/>
    </div>
);

export default App;