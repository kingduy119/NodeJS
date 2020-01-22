import React from 'react';
import { NavLink } from 'react-router-dom';

import './MainNavigation.css';
import UserContext from '../../context/user-context';

const mainNavigation = props => (
    <UserContext.Consumer>
        {(context) => {
            return (
                <header className="main-navigation">
                    <div className="main-navigation_logo">
                        <h1>The Navbar</h1>
                    </div>
                    <nav className="main-navigation_items">
                        <ul>
                            {!context.token && (
                            <li>
                                <NavLink to="/user">User</NavLink>
                            </li>
                            )}
                            <li>
                                <NavLink to="/event">Event</NavLink>
                            </li>
                            {context.token && (
                                <React.Fragment>
                                    <li>
                                        <NavLink to="/booking">Booking</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={context.logout}>Logout</button>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </nav>
                </header>
            );
        }}
    </UserContext.Consumer>
);

export default mainNavigation;
