import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";

export default function Signup(props) {
  const { SignUpFetch } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await SignUpFetch(credentials);
    console.log(response);
    if (response.success) {
      localStorage.setItem("auth-token", response.data);
      navigate("/");
      alert(response.message);
    } else {
      alert(response.message);
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className=" container">
      <br />
      <h2>Daftar Akun</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="form-label">
            Nama
          </label>
          <input
            type="text"
            className="form-control"
            value={credentials.name}
            onChange={onChange}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />

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
            minLength={5}
            required
          />
          <label htmlFor="pcassword" className="form-label">
            Konfirmasi Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.cpassword}
            onChange={onChange}
            id="cpassword"
            name="cpassword"
            minLength={5}
            required
          />
        </div>
        <br />
        <button type="submit" className="btn btn-primary w-100">
          Daftar
        </button>
      </form>
    </div>
  );
}
