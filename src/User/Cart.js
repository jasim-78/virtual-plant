import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./Product";
import OverModal from "./OrderModal";
import { baseurl } from "../App";
import { toast } from "react-toastify";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import OrderModal from "./OrderModal";

export default function Cart() {
    const [cartItem, setCartItem] = useState([]);
    const loggedUser = sessionStorage.getItem("User")

    const { pathname } = useLocation();

    useEffect(() => {
        getCartByUser()
    }, [cartItem])

    function getCartByUser() {
        axios
            .get(baseurl + `/Cart/getCartByUser/${loggedUser}`)
            .then((res) => {
                setCartItem(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    function DeleteCart() {
        axios
            .delete(baseurl + `/Cart/DeleteCart/${loggedUser}`)
            .then((res) => {
                toast.success(res.data);
                getCartByUser();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.data);
            })

    }

    const [show, setShow] = useState(false);

    const toggle = () => setShow(show);

    const flexStyle = "d-flex justify-content-between align-items-center";

    const subTotals = cartItem.map((item) => {
        return item.quantity * item.products?.price;
    });

    const totalPrice = subTotals.reduce((acc, curr) => {
        return acc + curr;
    }, 0);

    const totalQuantity = cartItem.reduce((acc, item) => acc + item.quantity, 0);

    const orderDetails = {
        totalPrice: totalPrice,
        totalQuantity: totalQuantity,
    };

    return (
        <div className="cart-bg" >
            <Container className="p-3">
                {cartItem != 0 ? (
                    <Row>
                        <div className="d-flex justify-content-between w-100">
                            <h2 className="text-primary">My Cart</h2>
                            <div>
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        DeleteCart();
                                    }}
                                >
                                    Clear Cart
                                </Button>

                            </div>
                        </div>
                        <Col md={7}>
                            {cartItem.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </Col>
                        <Col md={5}>
                            <Card className="my-2 shadow">
                                <Card.Header className="fs-3 text-primary text-center">
                                    Payment Details
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text className={flexStyle}>
                                        <span className="fw-bold">Delivery Fee: </span>
                                        <span>
                                            Free Delivery{" "}
                                            <i className="text-muted text-decoration-line-through">
                                                ₹40
                                            </i>
                                        </span>
                                    </Card.Text>
                                    <Card.Text className={flexStyle}>
                                        <span className="fw-bold">Total: </span>
                                        <span>{totalPrice}</span>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Button className="w-100" onClick={toggle}>
                                        Checkout
                                    </Button>
                                    <OrderModal
                                        show={show}
                                        toggle={toggle}
                                        orderDetails={orderDetails}
                                    />
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                ) : (
                    <div className="d-flex flex-column justify-content-center align-items-center"
                        style={{ minHeight: "60vh" }}
                    >
                        <h2>No Items in the Cart.....!</h2>
                        <p>
                            <Link className={`${pathname === "/User" && "active"}`} to={'/User'} >Click here</Link>&nbsp;to add items to cart
                        </p>
                    </div>
                )
                }
            </Container >
        </div >
    )
}