import React, { Component } from 'react';
import Modal from '../components/Modals/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import './event.css'

class EventPage extends Component {
    state = { creating: false };

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    onConfirmEvent = () => {
        this.setState({creating: false});
    };

    onCancelEvent = () => {
        this.setState({creating: false});
    };

    render() {
        return (
            <React.Fragment>
                {this.state.creating && <Backdrop />}
                {this.state.creating && <Modal title='Add Event' canConfirm canCancel
                        onConfirm={this.onConfirmEvent}
                        onCancel={this.onCancelEvent}>
                    <p>Content Modal</p>
                </Modal>}
                <div className="events-control">
                    <button className="btn" onClick={this.startCreateEventHandler}>
                        Create Event
                    </button>
                </div>
            </React.Fragment>
        );
    }
}

export default EventPage;