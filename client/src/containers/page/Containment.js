
// React 11:
// Composition vs Ingeritance
import React , { Component } from "react";


function FancyBorder(props) {
    return(
        <div className={'FancyBorder FancyBoder-' + props.color}>
            {props.children}
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 classname="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

export default class SignUpDialog extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }
    
    render(){
        return(
            <Dialog
                title="Mars Exploration Program"
                message="How should we refer to your?"
            >
                <input
                    value={this.state.login}
                    onChange={this.handleChange}
                />

                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp(e) {
        alert(`Welcome aboard, ${this.state.login}`);
    }
}


