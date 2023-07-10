import React from "react";
import AuthContext from "./AuthContext";
import apiHost from "../../datas/Host";
import axios from "axios";

const AuthState = ({ children }) => {
  async function LoginFetch(credentials) {
    try {
      const { data } = await axios.post(
        apiHost + "/api/auth/login",
        {
          email: credentials.email,
          password: credentials.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  }

  async function SignUpFetch(credentials) {
    const { name, email, password } = credentials;
    try {
      const { data } = await axios.post(
        apiHost + "/api/auth/createuser",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {
      return error.response.data;
    }
  }
  return (
    <AuthContext.Provider value={{ LoginFetch, SignUpFetch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
