import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../App";
import { toast } from "react-toastify"
import { Col, Row } from "react-bootstrap";

export default function Manageusers() {
    const [userid, SetUserid] = useState("")
    const [status, SetStatus] = useState("")

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const obj = { status }

    const Active = (e) => {
        e.preventDefault();
        axios.put(baseurl + `/UpdateStatus/${userid}`, obj)
            .then((res) => {
                toast.success(res.data)
                getUsers();
            })
            .catch((err) => {
                toast.error(err.data)
                console.log();
            })
    }


    const Block = (e) => {
        e.preventDefault();
        axios.put(baseurl + `/UpdateStatus/${userid}`, obj)
            .then((res) => {
                toast.success(res.data)
                getUsers();
            })
            .catch((err) => {
                toast.error(err.data)
                console.log(err);
            })
    }

    function getUsers() {
        axios
            .get(baseurl + "/GetUsers")
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                toast.error(err.data)
                console.log(err);
            })
    }

    const ActiveUser = (user) => {
        SetUserid(user.id);
        SetStatus("Active")
    }

    const BlockUser = (user) => {
        SetUserid(user.id);
        SetStatus("Blocked")
    }

    return (
        <div className="m-3">
            <form onSubmit={status === "Blocked" ? Active : Block}>
                <Row>
                    {users.map((user, index) => (
                        <Col key={index} md={4}>
                            <div className="card m-3">
                                <div className="card-body">
                                    <p>
                                        <strong>Name:</strong> {user.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {user.address}
                                    </p>
                                    <p>
                                        <strong>Mobile No:</strong> {user.mobile}
                                    </p>
                                    <span className="d-flex text-in-line">
                                        <strong>Status:</strong> &nbsp;
                                        {user.status === "Active" ? (
                                            <p className="text-success">
                                                {user.status}
                                            </p>
                                        ) : (
                                            <p className="text-danger">
                                                {user.status}
                                            </p>
                                        )}
                                    </span>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    {user.status === "Blocked" ? (
                                        <button className="btn btn-primary" onClick={() => ActiveUser(user)}>
                                            Active
                                        </button>) : (
                                        <button className="btn btn-primary" onClick={() => BlockUser(user)}>
                                            Block
                                        </button>
                                    )}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </form>
        </div>
    )
}