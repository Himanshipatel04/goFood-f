import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
import { useCart } from "../components/ContextReducer";

const Header = () => {
  const data = useCart()

  const navigate = useNavigate();
  const handleLogout = (e) => {
    localStorage.removeItem("authToken")
    navigate("/");
    window.location.reload()
  };

  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success relative">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Go food
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active font-bold"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active font-bold"
                  aria-current="page"
                  to="/myorders"
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex ">
                <button className="h-10 rounded-lg flex items-center justify-center bg-white">
                  <Link
                    className=" text-success font-bold  nav-link"
                    to="/login"
                  >
                    Login
                  </Link>
                </button>

                <button className="ml-6 h-10 rounded-lg flex items-center justify-center bg-white">
                  <Link
                    className=" text-success font-bold  nav-link"
                    to="/signup"
                  >
                    SignUp
                  </Link>
                </button>
              </div>
            ) : (
              <div className="flex items-center">
                <Link
                  className=" text-white text-xl font-bold  nav-link"
                  to="/cart"
                >
                  My Cart {" "}
                 <Badge pill bg-danger>{data.length}</Badge>
                </Link>
                {/* {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart/></Modal>:""} */}
                <button className="ml-6 h-10 rounded-lg bg-white">
                  <Link
                    className=" text-success font-bold  nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
