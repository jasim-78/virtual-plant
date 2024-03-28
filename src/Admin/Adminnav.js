import React from "react"
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import { RiLogoutBoxRLine } from "react-icons/ri";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Error from "../Errorpage";


export default function Adminnav() {
    const loggedadmin = sessionStorage.getItem("Admin")

    const { pathname } = useLocation();

    const navigate = useNavigate();

    function Logout(e) {
        e.preventDefault();
        sessionStorage.clear()
        navigate("/")
    }

    if (!loggedadmin){
        return < Error />;
    }

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
                <Container>
                    <Link className="navbar-brand" to={'/Admin'}> Virtual Plant Store </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <div className="navbar-nav">
                                <Link className={`nav-item nav-link ${pathname === "/Admin" && "active"}`}  to={'/Admin'}>
                                    Admindashboard
                                </Link>
                                <Link className={`nav-item nav-link ${pathname === "/Admin/Manageproducts" && "active"}`} to={'Manageproducts'}>
                                    Manageproducts
                                </Link>
                                <Link className={`nav-item nav-link ${pathname === "/Admin/Manageusers" && "active"}`} to={'Manageusers'}>
                                    Manageusers
                                </Link>
                            </div>
                        </Nav>
                        <div className="text-light" onClick={Logout}>
                            <RiLogoutBoxRLine style={{ width: '30px', height: '20px', cursor:"pointer" }} />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}
