import React, {
    Component
} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
    useRouteMatch,
    useParams
} from 'react-router-dom';

import {
    routesConfig,
    RouteWithSubRoute
} from './router-config';

const routes = [
    {
        path: "/",
        exact: true,
        slidebar: () => <div>home!</div>,
        main: () => <h2>Home</h2>,
        text: "Home"
    },
    {
        path: "/coffee",
        exact: true,
        slidebar: () => <div>coffee!</div>,
        main: () => <h2>Coffee</h2>,
        text: "Coffee"
    },
    {
        path: "/tea",
        exact: true,
        slidebar: () => <div>tea!</div>,
        main: () => <h2>Tea</h2>,
        text: "Tea"
    }
];

const NavCoffee = (
    <div style={{display: "flex"}}>
        <div
            style={{
                padding: "10px",
                width: "40%",
                background: "#f0f0f0"
            }}
        >
            <ul>
                {routes.map((route, index) => (
                    <li>
                        <Link to={route.path} >{route.text}</Link>
                    </li>
                ))}
            </ul>
            <Switch>
            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.slidebar />}
                />
            ))}
            </Switch>
        </div>
    </div>
);

function RouteConfig() {
    return(
    <div>
        <ul>
            <li>
                <Link to="/tacos">Tacos</Link>
            </li>
            <li>
                <Link to="/sandwiches">Sandwiches</Link>
            </li>
            <li>
                <Link to="/queryparams">Query Params</Link>
            </li>
        </ul>

        <Switch>
            {routesConfig.map((route, i) => (
                // Do something......
                <RouteWithSubRoute key={i} {...route} />
            ))}
        </Switch>
    </div>
    );
}




function Slidebar() {
    return (
        <Router>
            <RouteConfig />
        </Router>
    );
}



export default Slidebar;

