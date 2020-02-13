import React from 'react';
import {
    Switch,
    Route,
    Link
} from 'react-router-dom';

import QueryParamsRouter from './router-query-params';

export function RouteWithSubRoute(route) {
    return (
        <Route
            path={route.path}
            render={props => (
                <route.component
                    // pass the sub-routes down to keep nesting
                    {...props}
                    routes={route.routes}
                />
            )}
        />
    );
}

function Tacos({ routes }) {
    return (
        <div>
            <h2>Tacos</h2>
            <ul>
                <li>
                    <Link to="/tacos/bus">Bus</Link>
                </li>
                <li>
                    <Link to="/tacos/cart">cart</Link>
                </li>
            </ul>

            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoute key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}

function SandWitches() {
    return <h3>Sandwitches</h3>;
}

function Bus() {
    return <h3>Bus</h3>;
}

function Cart() {
    return <h3>Cart</h3>;
}

export const routesConfig = [
    {
        path: "/sandwiches",
        component: SandWitches
    },
    {
        path: "/tacos",
        component: Tacos,
        routes: [
            {
                path: "/tacos/bus",
                componet: Bus
            },
            {
                path: "tacos/cart",
                component: Cart
            }
        ]
    },
    {
        path: "/queryparams",
        component: QueryParamsRouter
    }
];