import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get("http://localhost:5000/users");
    setUser(result.data);
  };

  const deleteUser = async id =>{
    await axios.delete(`http://localhost:5000/users/${id}`);
    loadUser();

  }
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
            users.map(( user, index) =>(
                    <tr>
                    <th scope="row">{index +1}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                        <Link className="btn btn-primary mr-2" to={`users/${user.id}`}>View</Link>
                        <Link className="btn btn-outline-primary mr-2" to={`users/edit/${user.id}`}>Edit</Link>
                        <Link className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</Link>
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
