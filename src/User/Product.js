import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { baseurl } from "../App";
import { toast } from "react-toastify";
import { Card, Col, Row } from "react-bootstrap";

const ProductCard = ({ product }) => {
    console.log(product)

    const [cartItem, setCartItem] = useState([]);

    const loggedUser = sessionStorage.getItem("User")

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

    function DeleteItem(id) {
        axios
            .delete(baseurl + `/Cart/DeleteItem/${loggedUser}/${id}`)
            .then((res) => {
                toast.success(res.data)
                getCartByUser();
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data)
            });
    }

    function addToCart(id) {
        axios
            .post(baseurl + `/Cart/AddUpdateCart/${loggedUser}/${id}`)
            .then((res) => {
                toast.success(res.data);
                getCartByUser();
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data)
            });
    }

    function DecreaseProduct(id) {
        axios
            .put(baseurl + `/Cart/DecreaseProduct/${loggedUser}/${id}`)
            .then((res) => {
                toast.success(res.data)
                getCartByUser();
            })
            .catch((err) => {
                console.error(err);
                toast.error(err.response.data)
            });
    }
    return (
        <>
            <Card className="my-2 d-flex shadow">
                <Card.Body className="d-flex text-capitlize">
                    <Row className="w-100">
                        <Col md={3} className="d-flex justify-content-center">
                            <Card.Img
                                variant="left"
                                src={product.product?.image}
                                height={120}
                                width={150}
                                style={{ objectFit: "cover" }}
                            />
                        </Col>
                        <Col md={9}>
                            <div className="d-flex flex-column align-item-start justify-content-center w-100">
                                <Card.Title className="text-primary">{product.name}</Card.Title>
                                <Card.Text>
                                    {product.quantity} X {"₹"}
                                    {product.product?.price}
                                </Card.Text>
                                <div className="d-flex  justify-content-between align-items-center w-100">
                                    <span>
                                        Plant: <b>{product.product?.name}</b>
                                    </span>
                                    <Card.Text className="d-flex gap-2">
                                        <AiFillMinusCircle
                                            role="button"
                                            size="1.5rem"
                                            className="text-primary"
                                            onClick={() => DecreaseProduct(product.product?.id)}
                                        />
                                        <span>{product.quantity}</span>
                                        <AiFillPlusCircle
                                            role="button"
                                            size="1.5rem"
                                            className="text-primary"
                                            onClick={() => addToCart(product.product?.id)}
                                        />
                                    </Card.Text>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer>
                    <div className="d-flex justify-content-between">
                        <AiFillDelete
                            role="button"
                            size="1.5rem"
                            color="red"
                            onClick={() => DeleteItem(product.product?.id)}
                        />
                        <div className="fw-bold">
                            <span>Subtotal: ₹</span>
                            <span>{product.quantity * product.product?.price}</span>
                        </div>
                    </div>
                </Card.Footer>
            </Card>
        </>

    )
}

export default ProductCard;