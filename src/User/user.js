import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import { toast } from "react-toastify"
import { baseurl } from "../App";
import { useLocation } from "react-router-dom";

export default function User() {
    const [productList, setProductList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [cartItem, setCartItem] = useState([]);

    const catrgories = ["All", "Flower", "Fruit", "Gift", "Seeds", "Tree"]

    const { pathname } = useLocation();

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [selectedCategory]);

    useEffect(() => {
        if (pathname !== "/") {
            getCartByUser();
        }
    }, [pathname])

    const loggedUser = sessionStorage.getItem("User");

    function getProducts() {
        axios
            .get(baseurl + `/Product/GetAllProducts`)
            .then(res => {
                setProductList(res.data);
                setFilterList(res.data);
            })
            .catch(console.error);
    }

    function getCartByUser() {
        axios
            .get(baseurl + `/Cart/getCartByUser/${loggedUser}`)
            .then(res => setCartItem(res.data))
            .catch(console.error)
    }

    function addToCart(id) {

        axios
            .post(baseurl + `/Cart/AddUpdateCart/${loggedUser}/${id}`)
            .then((res) => {
                toast.success(res.data);
                getCartByUser();
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data);
            });
    }

    function filterProducts() {
        setFilterList(
            selectedCategory === "All"
                ? productList
                : productList.filter((product) => product.category === selectedCategory)
        );
    };

    function handleChange(e) {
        const term = e.target.value.toLowerCase();
        const filterList = productList.filter(
            (product) =>
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)
        );
        setFilterList(term !== "" ? filterList : productList);
    }

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h2 className="mt-4 text-dark">Our Products</h2>
            </div>
            {pathname !== "/" && (
                <div className="d-flex justify-content-center mt-3">
                    {catrgories.map((category) => (
                        <button
                            key={category}
                            className={`btn btn-outline-primary mx-2 ${selectedCategory === category ? "active" : ""
                                }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                    <input
                        className="form-control w-25"
                        placeholder="Search Here"
                        type="text"
                        onChange={handleChange}
                    />
                </div>
            )}
            <hr />
            <Container>
                {filterList.length > 0 ? (
                    <Row md={4}>
                        {filterList.map((plant) => (
                            <Col key={plant.id} className="my-4">
                                <div className="card m-3" style={{ height: 700 }}>
                                    <div className="card-header d-flex justify-content-center">
                                        <img
                                            src={plant.image}
                                            alt={plant.name}
                                            className="card-img-top image-hover-effect"
                                            style={{ maxHeight: "250px", objectFit: "cover" }} />
                                    </div>
                                    <div className="overflow-auto">
                                        <div className="card-body">
                                            <h5>{plant.name}</h5>
                                            <p>
                                                <strong>Category:</strong> {plant.category}
                                            </p>
                                            <p>
                                                <strong>Price:</strong> ₹{plant.price}
                                            </p>
                                            <span className="d-flex text-in-line">
                                                <strong>Availability:</strong> &nbsp;
                                                {plant.availability === "In Stock" ? (
                                                    <p className="text-success">
                                                        {plant.availability}
                                                    </p>
                                                ) : (
                                                    <p className="text-danger">
                                                        {plant.availability}
                                                    </p>
                                                )}
                                            </span>
                                            <p>
                                                <strong>Description:</strong> {plant.description}
                                            </p>
                                        </div>
                                    </div>
                                    {plant.availability === "In Stock" && (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => addToCart(plant.id)}
                                            disabled={plant.availability !== "In Stock"}>
                                            Add to Cart
                                        </button>
                                    )}
                                </div>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Row>
                        <h2 className="text-center text-danger pt-5">No Products Found </h2>
                    </Row>
                )}
            </Container>
        </div>
    );
}