import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
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
                <Nav.Link href="/about">About</Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="/topics">Topics</Nav.Link>
            </Nav.Item>
        </Nav>
    </Navbar>
    {
        <Switch>
            <Route path="/home">
                <Home/>
            </Route>
            <Route path="/about">
                <About/>
            </Route>
            <Route path="/topics">
                <Topics/>
            </Route>
        </Switch>
    }
    </Router>
    );
}

function Home() {
    return <h2>Home</h2>;
}
function About() {
    return <h2>About</h2>;
}
function Topics() {
    let {path, url} = useRouteMatch();
    return(
        <div>
            <h2>Topics</h2>
            <Nav>
                <Nav.Item>
                    <Nav.Link href={`${url}/components`}>Components</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={`${url}/props-v-state`}>Props v. State</Nav.Link>
                </Nav.Item>
            </Nav>
            {
                <Switch>
                    <Route exact path={path}>
                        <h3>Please select a topic.</h3>
                    </Route>
                    <Route path={`${path}/:topicId`}>
                        <Topic />
                    </Route>
                </Switch>
            }
        </div>
    );
}

function Topic() {
    let { topicId } = useParams();
    console.log("Topic: " + topicId);
    return <h3>Request topic ID: {topicId}</h3>;
}

export default Navigation;

