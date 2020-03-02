import React from "react";
import PropTypes from "prop-types";
import { Nav, NavDropdown } from "react-bootstrap";

const Link = ({path, title}) => ( <Nav.Link href={path}>{title}</Nav.Link> );

Link.propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

const LinkDropdown = ({id, title, links}) => (
    <NavDropdown id={id} title={title}>
        {links.map(link => (
            <NavDropdown.Item href={link.path}>{link.title}</NavDropdown.Item>
        ))}
    </NavDropdown>
);

LinkDropdown.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        })
    )
};

export { Link, LinkDropdown };
