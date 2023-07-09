import React from "react";
import AuthContext from "./AuthContext";
import apiHost from "../../datas/Host";
import axios from "axios";

const AuthState = ({ children }) => {
  async function LoginFetch(credentials) {
    // const response = await fetch(apiHost + `/api/auth/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": "true",
    //   },
    //   // mode: "no-cors",
    //   body: JSON.stringify({
    //     email: credentials.email,
    //     password: credentials.password,
    //   }),
    // });

    return await axios.post(
      apiHost + "/api/auth/login",
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        // },
        withCredentials: false,
      }
    );
  }

  async function SignUpFetch(credentials) {
    const { name, email, password } = credentials;
    const response = await fetch(apiHost + `/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    return await response.json();
  }
  return (
    <AuthContext.Provider value={{ LoginFetch, SignUpFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
