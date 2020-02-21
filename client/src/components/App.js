import React, { Component } from 'react';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.min.css';
// import Navigation from '../components/navbar/Navigation';
import Navigation from "../containers/Navigation";

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