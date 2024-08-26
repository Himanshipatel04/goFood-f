import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const route = useNavigate()
  const [data, setData] = useState({});
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/users/api/v1/createUser", data);
      console.log(res);
      alert("User registered successfully!");
      route("/login")
    } catch (error) {
      console.log(`Error while registering ${error}`);
    } 
  };

  return (
    <div className="flex items-center justify-center mt-56">
      <form onSubmit={handleSubmit} action="post">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={handleChange}
            className="form-control"
            id="email"
            aria-describedby="emailHelp" 
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Username
          </label>
          <input
            type="text"
            onChange={handleChange}
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Address
          </label>
          <input
            type="text"
            onChange={handleChange}
            className="form-control"
            id="location"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            onChange={handleChange}
            className="form-control"
            id="password"
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/login" className="m-3 btn btn-danger">
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default SignUp;


