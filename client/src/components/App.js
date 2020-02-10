import React, { Component } from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from '../components/Footer';

import Navigation from '../components/navbar/Navigation';

class App extends Component {
    render() {
        return (
            <div>
                {/* <AddTodo/>
                <VisibleTodoList />
                <Footer /> */}
                <Navigation/>
            </div>
        );
    }
}

export default App;