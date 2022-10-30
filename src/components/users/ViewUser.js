import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewUser() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
    });

    const { id } = useParams();
    const tempGetUser = useRef()

    const getUser = async () => {
        const result = await axios.get(`https://curd-operations-api.herokuapp.com/${id}`);
        setUser(result.data);
    }

    tempGetUser.current = getUser

    useEffect(() => {
        tempGetUser.current();
    }, []);

    return (
        <div className="container py-4">
            <Link className="btn btn-primary" to="/">Go to Home</Link>
            <h1 className="display-4">User Id: {id}</h1>
            <hr />
            <ul className="list-group w-50 ">
                <li className="list-group-item"><b>Name:</b> {user.name}</li>
                <li className="list-group-item"><b>Username:</b> {user.username}</li>
                <li className="list-group-item"><b>Email:</b> {user.email}</li>
                <li className="list-group-item"><b>Phone:</b> {user.phone}</li>
                <li className="list-group-item"><b>Website:</b> {user.website}</li>
            </ul>
        </div>
    )
}

export default ViewUser;
