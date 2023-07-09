import React from "react";
import { Link,  useNavigate } from "react-router-dom";
import "../index.css";

export default function NavBar() {
  let nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    nav("/login");
  };
  return (
    <>
      <nav className="navbar  navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          CatatanKu
        </Link>
        {localStorage.getItem("auth-token") ? (
          <span className="mx-4">
            <b onClick={handleLogout} className="nav-link ">
              Logout
            </b>
          </span>
        ) : (
          <div className=" ">
            <form className="d-flex gap-3 mx-3">
              <Link className="nav-link" to="/login" role="button">
                Login
              </Link>
              <Link className="nav-link" to="/signup" role="button">
                Signup
              </Link>
            </form>
          </div>
        )}
      </nav>
    </>
  );
}
