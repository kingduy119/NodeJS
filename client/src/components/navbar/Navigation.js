import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch,
    useParams,
    useHistory,
    useLocation
} from 'react-router-dom';

import {
    Navbar,
    Nav,
    Form
} from 'react-bootstrap'

import AddTodo from '../../containers/AddTodo';
import VisibilityFilter from '../../containers/VisibleTodoList'

const Navigation = () => {
    return (
    <Router>
    <Navbar bg="light" expand="lg">

        <Navbar.Brand href="/home">Brand</Navbar.Brand>
        <Nav
            activeKey="/home"
        >
            <Nav.Item>
                <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/old-match">Old Match, tobe redirected</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/will-match">Will Match</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/will-not-match">Will Not Match</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/also/will/not/match" >Alse Will Not Match</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
    { // **************************************************************************
        <Switch>
            <Route path="/home">
                <Home/>
            </Route>

            <Route path="/old-match">
                <Redirect to="/will-match" />
            </Route>

            <Route path="/will-match">
                <WillMatch />
            </Route>

            <Route path="*">
                <NoMatch/>
            </Route>
        </Switch>
    }
    </Router>
    );
}

function Home() { return <h2>Home</h2>; }
function WillMatch() { return <h2>Will Match</h2> }
function NoMatch() {
    let location = useLocation();

    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    );
}

export default Navigation;

