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
            { path: "/home", name: "Home", component: <Home/> },
            { path: "/form", name: "Form", component: <NameForm/>},
            { path: "/temperature", name: "Temperature", component: <Temperature/>},
            { path: "/containment", name: "Containment", component: <Containment/>},
            { path: "/filterable", name: "Filterable", component: <FilterableProductTable products={PRODUCTS}/>}
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_advanced",
        name: "Advanced",
        links: [
            { path: "/portal", name: "Portal", component: <Portal />},
            { path: "/hook", name: "React Hook", component: <Hook />},
            { path: "/lifecycle", name: "Lifecycle", component: <LifeCycle />},
            { path: "/action/1-4", name: "Other", component: <h2>Other</h2> }
        ]
    },
    {
        type: "dropdown",
        id: "dropdown_concurent-data-fetch",
        name: "Concurent Data Fetch",
        links: [
            { path: "/data-fetch", name: "Suspense Data Fetch", component: <SuspenseDataFetch />},
            { path: "/ui-pattern", name: "UI Mode Pattern", component: <UIModePattern />}
        ]
    }
];

const navConfig = {
    search: {
        text: <FormControl type="text" placeholder="Search" className="mr-sm-2"/>,
        button: <Button variant="outline-info">Search</Button>
    }
}

function FormSearchFilter() {
    return(
        <Form inline>
            <FormControl type="text" className="mr-sm-2" placeholder="Search"/>
            <Button variant="outline-info" >Search</Button>
        </Form>
    );
}

function RouteGroup({data}) {
    return(
        <Switch>
            <React.Fragment>
            {data.map(item => {
                if(item.type === "link")
                    return <Route path={item.path}>{item.component}</Route>
                else if(item.type === "dropdown") {
                    return item.links.map(link => {
                        return <Route path={link.path}>{link.component}</Route>
                    })
                }
            })}
            </React.Fragment>
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
                    else if(item.type === "dropdown")
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
            {links.map(item => 
                <NavDropdown.Item href={item.path}>{item.name}</NavDropdown.Item>
            )}
        </NavDropdown>
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
                {/* --- Logo --- */}
                <Navbar.Brand href="/home">Navbar</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* --- Navigation --- */}
                <NavbarCollapseGroup data={dataNavbar}/>

                {/* --- SearchForm --- */}
                <FormSearchFilter />
            </Navbar>

            {/* --- router --- */}
            <RouteGroup data={dataNavbar} />
        </React.Fragment>
        )
    }
}

