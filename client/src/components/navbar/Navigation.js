import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import {
    Navbar,
    Nav,
    Form
} from 'react-bootstrap'

const Navigation = () => {
    return (
    <Navbar bg="light" expand="lg">

        <Navbar.Brand href="/home">Brand</Navbar.Brand>
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/link1">link-1</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/link-2">link-2</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
    );
}


export default Navigation;

