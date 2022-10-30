import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [users, setUser] = useState([]);

  const getUser = async () => {
    const result = await axios.get("https://curd-operations-api.herokuapp.com/getUsers");
    console.log(result)
    setUser(result.data);
  };

  const deleteUser = async id => {
    await axios.delete(`https://curd-operations-api.herokuapp.com/${id}`);
    getUser();
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home page</h1>
        <table class="table border shadow ">
          <thead class="thead-dark">
            <tr>
              <th scope="col">Order</th>
              <th scope="col">Name</th>
              <th scope="col">UserName</th>
              <th scope="col">Email Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link className="btn btn-primary mr-2" to={`users/${user._id}`}>View</Link>
                    <Link className="btn btn-outline-primary mr-2" to={`users/edit/${user._id}`}>Edit</Link>
                    <Link className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;
