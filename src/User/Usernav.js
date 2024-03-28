import React, { useEffect, useState } from "react"
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom"
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiShoppingCart2Line } from "react-icons/ri";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Error from "../Errorpage";
import axios from "axios";
import { baseurl } from "../App";
import { Badge } from "react-bootstrap";


export default function Usernav() {
    const [cartItem, setCartItem] = useState([]);
    const loggedUser = sessionStorage.getItem("User")

    const { pathname } = useLocation();

    const navigate = useNavigate();

    useEffect(() => {
        getCartByUser()
    })

    function getCartByUser() {
        axios
            .get(baseurl + `/Cart/getCartByUser/${loggedUser}`)
            .then(res => setCartItem(res.data))
            .catch((err) => console.log(err))
    }

    function Logout(e) {
        e.preventDefault();
        sessionStorage.clear()
        navigate("/")
    }

    if (!loggedUser) {
        return < Error />;
    }

    const totalQuntity = cartItem.reduce((quantity, item) => {
        return item.quantity + quantity;
    }, 0)

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
                <Container>
                    <Link className="navbar-brand" to={'/User'}> Virtual Plant Store </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <div className="navbar-nav">
                                <Link className={`nav-item nav-link ${pathname === "/User" && "active"}`} to={'/User'} >Products</Link>
                                <Link className={`nav-item nav-link ${pathname === "/User/MyOrders" && "active"}`} to={'MyOrders'}>My Order</Link>
                                <Link className={`nav-item nav-link ${pathname === "/User/MyProfile" && "active"}`} to={'MyProfile'}>My Profile</Link>

                            </div>
                        </Nav>
                        <Link className={`nav-item nav-link text-light`} to={'Cart'}>
                            <RiShoppingCart2Line role="button" style={{ width: '30px', height: '20px', cursor: "pointer" }} />
                            <Badge pill bg="dark" size="sm" role="button">
                                {totalQuntity}
                            </Badge>
                        </Link>
                        <div className="text-light" onClick={Logout}>
                            <RiLogoutBoxRLine style={{ width: '30px', height: '20px', cursor: "pointer" }} className="m-2" />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}
