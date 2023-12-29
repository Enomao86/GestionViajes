"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Panel from "../../pages/Panel";
import ModalButton from "./component/ModalButton";
import Register from "../../pages/register";
import IngresarPasajeros from "../../pages/IngresarPasajeros";
import Home from "/Home";
import Login from "../../pages/Login";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Panel" element={<Panel />} />
          <Route path="IngresarPasajeros" element={<IngresarPasajeros />} />
          <Route path="Register" element={<Register />} />
          <Route path="Login" element={<Login />} />
        </Routes>
        <h2>hola mundo</h2>
      </div>
    </Router>
  );
}

export default App;
