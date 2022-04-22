'use strict';
import { Navbar, Nav, NavItem, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Logo from './images/burger.jpg';

const React = require('react');

class Header extends React.Component{

      render() {
        return (
        <Navbar bg="primary" variant="dark">
        <Container>
            <LinkContainer to="/">
            <Navbar.Brand>
                <img alt="" src={Logo} width="40" height="40"
                className="d-inline-block align-middle"/>{' '}BurgerWorld
                </Navbar.Brand>
             </LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/standard">
                            <Nav.Link>Our Standard Burgers</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/create">
                            <Nav.Link>Your Creations</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
      }

}

export default Header;