import React, {
    Component
} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { 
    Container,
    Row,
    Col,
    NavDropdown,
    Button
} from "react-bootstrap";

class Navigation extends Component {
    constructor(props) {
        super(props);

    }

    showLinks(links={}) {
        return links.map(item => (<Nav.Link href={item.path}>{item.text}</Nav.Link>))
    }

    showDropDown(dropdown) {
        return (
            <NavDropdown
        title={dropdown.title}
        id="collasible-nav-dropdown"
        >
            {dropdown.links.map(item => (
                <NavDropdown.Item path={item.path} >
                    item.text
                </NavDropdown.Item>
            ))}
        </NavDropdown>
        );
    }

    showSearch(search){
        return ( 
            <Form inline>
                {search.text}
                {search.button}
            </Form>
        )
    }

    render() {
        return (
        <React.Fragment>
            <Navbar bg="dark" variant="dark" expand="lg">

            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />

            <Navbar.Collapse>
                <Nav className="mr-auto">
                    {/* <-- Links --> */}
                    {this.showLinks(navConfig.links)}

                    {/* <-- Dropdown --> */}
                    {this.showDropDown(navConfig.dropdown)}
                </Nav>

                {/* <-- Search -->> */}
                {this.showSearch(navConfig.search)}
                
            </Navbar.Collapse>
            </Navbar>
        </React.Fragment>
        )
    }
}

const navConfig = {
    links: [
        { path: "/home", text: "Home"},
        { path: "/features", text: "Features"},
        { path: "/pricing", text: "Pricing"}
    ],
    dropdown: {
        title: "Dropdown",
        links: [
            { path: "/action/1-1", text: "Another Action" },
            { path: "/action/1-2", text: "Something" },
            { path: "/action/1-3", text: "Seperated Link" },
            { path: "/action/1-4", text: "Other" }
        ]
    },
    search: {
        text: (<FormControl type="text" placeholder="Search" className="mr-sm-2"/>),
        button: (<Button variant="outline-info">Search</Button>)
    }
}

export default Navigation;