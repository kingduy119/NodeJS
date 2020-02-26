import React, { Component } from "react";

export default class LifeCycle extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
    }

    componentDidMount() {
        document.title = `You ${this.state.count}`;
        console.log("Component-Mount");
    }

    componentDidUpdate() {
        document.title = `You ${this.state.count}`;
        console.log("Component-Update");
    }

    render() {
        return(
            <div>
                <p>You clicked {this.state.count} times.</p>
                <button
                    onClick={() => this.setState({count: this.state.count +1})}
                >Click</button>
            </div>
        );
    }
}