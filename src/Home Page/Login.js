import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify"
import "../App.css";

export default function Login() {

    const [usertype, setUsertype] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        const obj = { email, password, userType: usertype };
        axios
            .post("http://localhost:8080/LoginVerify", obj)
            .then((res) => {
                if (res.data === "admin") {
                    sessionStorage.setItem("Admin", email)
                    toast.success("Login Succesfull")
                    navigate("/Admin");
                }
                if (res.data === "user") {
                    toast.success("Login Succesfull")
                    sessionStorage.setItem("User", email)
                    navigate("/User");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.response.data)
            });
    }

    return (
        <div>
            <div className="container m-3 mx-auto">
                <h2 className="text-center">Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <label></label>
                    <select
                        className="form-select text-center mb-3"
                        value={usertype}
                        onChange={(e) => setUsertype(e.target.value)}
                        required
                    >
                        <option value="" hidden>
                            ---Select Usertype---
                        </option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <label>Enter email</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Enter Password</label>
                    <input
                        type="password"
                        className="form-control mb-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="text-center">
                        <button to="/" className="btn btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                    <div>
                        Not Registered? <Link to="/Register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    );

}

