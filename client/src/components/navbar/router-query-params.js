import React from 'react';
import { 
    BrowserRouter as Router,
    Link,
    useLocation
 } from "react-router-dom";


export default function QueryParamsComponent() {
    return (
        <Router>
            <QueryParams />
        </Router>
    );
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}


function QueryParams() {
    let query = useQuery();
    return(
        <div>
            <div>
                <h2>Accounts</h2>
                <ul>
                    <li>
                        <Link to="/queryparams/account?name=netflix" >Netflix</Link>
                    </li>

                    <li>
                        <Link to="/queryparams/account?name=zillow-group" >Zillow Group</Link>
                    </li>

                    <li>
                        <Link to="/queryparams/account?name=yahoo" >Yahoo</Link>
                    </li>

                    <li>
                        <Link to="/queryparams/account?name=modus-create" >Modus Create</Link>
                    </li>
                </ul>

                <Child name={query.get("name")} />
            </div>
        </div>
    );
}

function Child({name}) {
    return(
        <div>
            {name ? (
                <h3>
                    The <code>name</code> in the query string is &quot;{name}&quot;
                </h3>
            ) : (
                <h3>There is no name in the query string</h3>
            )}
        </div>
    );
}


