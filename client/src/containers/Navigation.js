import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import {Navbar, Nav, Form, FormControl, NavDropdown, Button} from "react-bootstrap";
import { fetchNavbar } from "../api/FakeApi";

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
        const dataNavbar = fetchNavbar();
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

