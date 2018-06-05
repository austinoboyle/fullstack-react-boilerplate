import React from "react";
import { Nav, Navbar, MenuItem, NavItem, NavDropdown } from "react-bootstrap";
import { Container as UIContainer } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

const Header = ({ history, location }) => {
    const navigateTo = (e, route) => {
        e.preventDefault();
        if (location.pathname !== route) {
            history.push(route);
        }
    };
    return (
        <Navbar inverse collapseOnSelect>
            <UIContainer>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Sample App</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem
                            eventKey={1}
                            href="/about"
                            onClick={e => navigateTo(e, "/about")}
                        >
                            About
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link
                        </NavItem>
                        <NavDropdown
                            eventKey={3}
                            title="Dropdown"
                            id="basic-nav-dropdown"
                        >
                            <MenuItem eventKey={3.1}>Action</MenuItem>
                            <MenuItem eventKey={3.2}>Another action</MenuItem>
                            <MenuItem eventKey={3.3}>
                                Something else here
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>Separated link</MenuItem>
                        </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Link Right
                        </NavItem>
                        <NavItem eventKey={2} href="#">
                            Link Right
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </UIContainer>
        </Navbar>
    );
};

export default withRouter(Header);
