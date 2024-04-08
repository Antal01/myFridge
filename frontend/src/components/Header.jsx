import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { useAuth } from "./AuthContext.jsx";

const Header = () => {
    const { isLoggedIn, username, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        {isLoggedIn && (
                            <>
                                <NavLink className="nav-link" to="/myfridge">
                                    What Inside
                                </NavLink>
                                <NavLink className="nav-link" to="/recipes">
                                    Recipes
                                </NavLink>
                            </>
                        )}
                    </Nav>
                    {isLoggedIn ? (
                        <div className="d-flex align-items-center">
                            <span className="text-light me-3">Welcome, {username}</span>
                            <Button variant="outline-info" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login">
                                <Button variant="outline-info" className="me-2">
                                    Login
                                </Button>
                            </Link>
                            <Link to="/registration">
                                <Button variant="outline-info">Register</Button>
                            </Link>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
