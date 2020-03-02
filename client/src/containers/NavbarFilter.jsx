import React, { Component } from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

class NavbarFilter extends Component {
    render() {
        return(
            <Navbar>
                <Navbar.Brand>Logo</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    {/* Links */}
                    {this.props.listlink.map(item => {
                        if(item.type === "link")
                            return <Nav.Link></Nav.Link>
                        else if(item.type === "dropdown")
                            return (
                                <NavDropdown>
                                    {item.links.map(link =>
                                        <NavDropdown.Item href={link.path}>
                                            {link.title}
                                        </NavDropdown.Item>
                                    )}
                                </NavDropdown>
                            )
                    })}

                    {/* Search */}
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    brand: state.navbar.brand,
    listlink: state.navbar.listlink,
    search: state.navbar.search
});


export default connect(mapStateToProps)(NavbarFilter)


