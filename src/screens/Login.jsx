import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/users/api/v1/login",
        data
      );
      // console.log(res);
      alert("User logged in successfully!");
      localStorage.setItem("authToken",res.data.data.authtoken)
      localStorage.setItem("userEmail",res.data.data.user.email);

      navigate("/");
    } catch (error) {
      console.log("Error while logging in!---->", error);
      setError("Error while logging in. Please check your username and password.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center mt-56">
        <form onSubmit={handleSubmit} action="post">
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
          {error && <div className="mb-3 text-danger">{error}</div>}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/signup" className="m-3 btn btn-danger">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
