import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import Search from "./forms/FormSearch";

class NavbarFilter extends Component {
    render() {
        let navbar = this.props.navbar;
        return(
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href={navbar.brand.path}>{navbar.brand.text}</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        {/* Links */}
                        {navbar.listlink.map(item => {
                            if(item.type === "link")
                        return <Nav.Link href={item.path}>{item.title}</Nav.Link>
                            else if(item.type === "dropdown")
                                return (
                                    <NavDropdown title={item.title}>
                                        {item.links.map(link =>
                                            <NavDropdown.Item href={link.path}>
                                                {link.title}
                                            </NavDropdown.Item>
                                        )}
                                    </NavDropdown>
                                )
                        })}
                    </Nav>
                    {/* Search */}
                    <Search/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    navbar: state.navbar
});

export default connect(mapStateToProps)(NavbarFilter)


