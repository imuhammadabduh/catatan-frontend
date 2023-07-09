import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import NavBar from "./layouts/NavBar";
import NoteState from "./context/notes/NoteState";
import Add from "./pages/Add";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AuthState from "./context/auth/AuthState";
function App() {
  return (
    <AuthState>
      <NoteState>
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/add" element={<Add />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/signup" element={<Signup />}></Route>
          </Routes>
        </Router>
      </NoteState>
    </AuthState>
  );
}

export default App;
