import React from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
    const { pathname } = useLocation();

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Link className="navbar-brand" to={'/'}> Virtual Plant Store </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <div className="navbar-nav">
                                <Link className={`nav-item nav-link ${pathname === "/" && "active"}`}  to={'/'}>Home</Link>
                                <Link className={`nav-item nav-link ${pathname === "/About" && "active"}`} to={'About'}>About Us</Link>
                                <Link className={`nav-item nav-link ${pathname === "/Login" && "active"}`} to={'Login'}>Login</Link>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    )
}
