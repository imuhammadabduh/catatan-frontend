import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { LoginFetch } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await LoginFetch(credentials);
    console.log("res:",response);
    if (response.success) {
      localStorage.setItem("auth-token", response.data);
      navigate("/");
    } else {
      alert(response.message);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
  return (
    <div className="container">
      <br />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
}
