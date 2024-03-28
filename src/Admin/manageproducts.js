import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify"
import { baseurl } from "../App";
import { useLocation } from "react-router-dom";

export default function Manageproducts() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [availability, setAvailability] = useState("");
    const [productid, setProductId] = useState("");
    const [category, setCategory] = useState("");
    const { pathname } = useLocation();

    const [productList, setProductList] = useState([]);

    const categories = ['Flower', 'Fruit', 'Gift', 'Seeds', 'Tree'];

    useEffect(() => {
        getProducts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader()
        reader.onloadend = () => {
            const dataURL = reader.result;
            setImage(dataURL);
        }
        reader.readAsDataURL(file)
    }



    const handleAddProduct = (e) => {
        e.preventDefault();
        const newPlant = {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            availability: availability,
        };
        axios.post(baseurl + "/Product/AddProducts", newPlant)
            .then((res) => {
                toast.success(res.data)
                getProducts();
                ClearFilds();
            })
            .catch((err) => {
                toast.error(err.data)
                console.log(err);
            })
    }

    const handleEditProduct = (e) => {
        e.preventDefault();
        const newPlant = {
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            availability: availability,
        };
        axios.put(baseurl + `/Product/UpdateProduct/${productid}`, newPlant)
            .then((res) => {
                toast.success(res.data)
                getProducts();
                ClearFilds();
            })
            .catch((err) => {
                toast.error(err.data)
                console.log(err);
            })
    }


    function getProducts() {
        axios
            .get(baseurl + `/Product/GetAllProducts`)
            .then(res => {
                setProductList(res.data);
            })
            .catch(err => {
                toast.error(err.data)
                console.log(err);
            })
    }

    function ClearFilds() {
        setName("");
        setDescription("");
        setPrice("");
        setAvailability("");
        setImage("");
        setProductId("");
        document.getElementById("image").value = null;
        setCategory("");
    }

    function deleteProduct(id) {
        axios
            .delete(baseurl + `/Product/DeleteProducts/${id}`)
            .then(res => {
                toast.success(res.data);
                getProducts();
                ClearFilds();
            })
            .catch(err => {
                toast.error(err.data)
                console.log(err);
            })
    }

    const AssignData = (product) => {
        setName(product.name);
        setPrice(product.price);
        setAvailability(product.availability);
        setDescription(product.description);
        setProductId(product.id);
        setCategory(product.category);
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className="container">
                {pathname === "/Admin/Manageproducts" && (
                    <>
                        <h2 className="text-center m-3">Add Product to Sell</h2>
                        <form onSubmit={productid ? handleEditProduct : handleAddProduct}>
                            <select
                                className="form-select text-center mb-3"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="" hidden>
                                    ---Select Category---
                                </option>
                                {categories.map((cat) => {
                                    return <option value={cat}>{cat}</option>;
                                })}
                            </select>
                            <label>Plant Name:</label>
                            <input
                                type="textbox"
                                className="form-control mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>Price:</label>
                            <input
                                type="number"
                                className="form-control mb-3"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                            <label>Image:</label>
                            <input
                                type="file"
                                className="form-control mb-3"
                                id="image"
                                onChange={handleImageChange}
                            />
                            <label>Discription:</label>
                            <textarea
                                className="form-control mb-3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                            {productid && (
                                <>
                                    <label>Availability:</label>
                                    <select
                                        className="form-select mb-3"
                                        value={availability}
                                        onChange={(e) => setAvailability(e.target.value)}
                                        required
                                    >
                                        <option value="In Stock">In Stock</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </>
                            )}
                            <div className="d-flex text-inline">
                                {productid ? (
                                    <button className="btn btn-primary" type="submit">
                                        Update
                                    </button>) : (
                                    <button className="btn btn-primary" type="submit">
                                        Add Plant
                                    </button>
                                )}
                                <div className="text-decoration-underline text-primary m-2"
                                    onClick={ClearFilds}
                                    style={{ cursor: "pointer" }}
                                >
                                    ResetFilds
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
            <div className="m-3" >
                <h2>Added Products:</h2>
                <Row  md={4}>
                    {productList.map((plant, index) => (
                        <Col key={index}>
                            <div className="card m-3" style={{ height: 700 }}>
                                <div className="card-header d-flex justify-content-center">
                                    <img src={plant.image} alt={plant.name} style={{ maxHeight: "250px", objectFit: "cover" }}/>
                                </div>
                                <div className="overflow-auto">
                                    <div className="m-2">
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
                                <div className="card-footer d-flex justify-content-end">
                                    <button className="btn btn-primary" onClick={() => deleteProduct(plant.id)}>
                                        Delete
                                    </button>
                                    {pathname === "/Admin/Manageproducts" && (
                                        <button className="btn btn-warning ms-3" onClick={() => AssignData(plant)}>
                                            Edit
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );

}

