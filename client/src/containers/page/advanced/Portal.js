import React, { Component } from "react";
import ReactDOM from "react-dom";

class Modal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // return ReactDOM.createPortal(
        //     this.props.children,
        //     this.el,
        // );
        return(
            <div className="modal">{this.props.children}</div>
        );
    }
}

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {click: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(prevState => ({
            click: prevState.click + 1
        }))
    }

    render() {
        return(
            <div onClick={this.handleClick}>
                <p>Clicked: {this.state.click}</p>
                <div>
                    <button>Click</button>
                </div>
            </div>
        );
    }
}




