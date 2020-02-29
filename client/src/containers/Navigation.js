import React, {
    Component
} from "react";

import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import { 
    NavDropdown,
    Button,
    Dropdown
} from "react-bootstrap";

import Home from "./page/Home";
import NameForm from "./page/Form";
import Temperature from "./page/Temperature";
import Containment from "./page/Containment";
import FilterableProductTable from "./page/FilterableProductTable.js";

// Advanced:
import Portal from "./page/advanced/Portal";
import Hook from "./page/advanced/Hook";
import LifeCycle from "./page/advanced/Lifecycle";

// Concurrent Data fetching:
import SuspenseDataFetch from "./page/concurrent-data-fetch/Suspense";
import UIModePattern from "./page/concurrent-data-fetch/ModePattern";

const PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
  ];


const dataNavbar = [
    {
        type: "dropdown",
        id: "dropdown_main-concepts",
        name: "Main Concepts",
        links: [
            { path: "/home", text: "Home", component: <Home/> },
            { path: "/form", text: "Form", component: <NameForm/>},
            { path: "/temperature", text: "Temperature", component: <Temperature/>},
            { path: "/containment", text: "Containment", component: <Containment/>},
            { path: "/filterable", text: "Filterable", component: <FilterableProductTable products={PRODUCTS}/>}
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_advanced",
        name: "Advanced",
        links: [
            { path: "/portal", text: "Portal", component: <Portal />},
            { path: "/hook", text: "React Hook", component: <Hook />},
            { path: "/lifecycle", text: "Lifecycle", component: <LifeCycle />},
            { path: "/action/1-4", text: "Other", component: <h2>Other</h2> }
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_concurent-data-fetch",
        name: "Concurent Data Fetch",
        links: [
            { path: "/data-fetch", text: "Suspense Data Fetch", component: <SuspenseDataFetch />},
            { path: "/ui-pattern", text: "UI Mode Pattern", component: <UIModePattern />}
        ]
    }
];

const navConfig = {
    main_concepts:{
        name: "Main Concepts",
        links: [
            { path: "/home", text: "Home", component: <Home/> },
            { path: "/form", text: "Form", component: <NameForm/>},
            { path: "/temperature", text: "Temperature", component: <Temperature/>},
            { path: "/containment", text: "Containment", component: <Containment/>},
            { path: "/filterable", text: "Filterable", component: <FilterableProductTable products={PRODUCTS}/>}
        ]
    },
    advanced: {
        name: "Advanced",
        links: [
            { path: "/portal", text: "Portal", component: <Portal />},
            { path: "/hook", text: "React Hook", component: <Hook />},
            { path: "/lifecycle", text: "Lifecycle", component: <LifeCycle />},
            { path: "/action/1-4", text: "Other", component: <h2>Other</h2> }
        ]
    },
    concurrent: {
        name: "Concurrent DF",
        links: [
            { path: "/data-fetch", text: "Suspense Data Fetch", component: <SuspenseDataFetch />},
            { path: "/ui-pattern", text: "UI Mode Pattern", component: <UIModePattern />}
        ]
    },
    search: {
        text: <FormControl type="text" placeholder="Search" className="mr-sm-2"/>,
        button: <Button variant="outline-info">Search</Button>
    }
}

class ListRoute extends Component {
    render() {
        return(
            this.props.routes.map(item => (
                <Route path={item.path}>{item.component}</Route>
            ))
        );
    }
}

function RouteGroup({data}) {
    let routes = data;
    return(
        <Switch>
            {routes.map(route => (
                <Route path={route.path}>{route.component}</Route>                
            ))}
        </Switch>
    );
}

function NavbarCollapseGroup({data}) {
    return(
        <Navbar.Collapse>
            <Nav className="mr-auto">
                {data.map(item => {
                    if(item.type === "link")
                        return <LinkItem link={item}/>
                    else
                        return <DropdownItem dropdown={item}/>
                })}
            </Nav>
        </Navbar.Collapse>
    );
}

function LinkItem({link}) {
    return <Nav.Link href={link.path}>{link.name}</Nav.Link>;
}

function DropdownItem({dropdown}) {
    let name = dropdown.name;
    let id = dropdown.id;
    let links = dropdown.links;
    return(
        <NavDropdown title={name} id={id}>
            <React.Fragment>
            {links.map(item => (
                <NavDropdown.Item href={item.path}>{item.name}</NavDropdown.Item>
            ))}
            </React.Fragment>
        </NavDropdown>
    );
}

class ListDropdown extends Component {
    render() {
        const name = this.props.dropdown.name;
        const links = this.props.dropdown.links;
        return(
            <NavDropdown title={name} id="collasible-nav-dropdown">
                {links.map(item => (
                    <NavDropdown.Item href={item.path}>{item.text}</NavDropdown.Item>
                ))}
            </NavDropdown>
        );
    }
}

function Search({search}) {
    return(
        <Form inline>
            {search.text}
            {search.button}
        </Form>
    );
}

export default class FilterNavigationContainer extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">

            <Navbar.Brand href="/home">Navbar</Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <NavbarCollapseGroup data={dataNavbar}/>
            
            </Navbar>

            <Switch>
               <React.Fragment>
                <ListRoute routes={navConfig.main_concepts.links}/>
                <ListRoute routes={navConfig.advanced.links}/>
                <ListRoute routes={navConfig.concurrent.links}/>
               </React.Fragment>
            </Switch>
        </React.Fragment>
        )
    }
}

