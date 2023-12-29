"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Panel from "../../pages/Panel";
import ModalButton from "./component/ModalButton";
import IngresarPasajeros from "../../pages/IngresarPasajeros";
import Home from "/Home";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "@/consts/clientId";


function App() {
  return (
<GoogleOAuthProvider clientId={CLIENT_ID}>


<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Panel" element={<Panel />} />
        <Route path="IngresarPasajeros" element={<IngresarPasajeros />} />
        <Route path="Register" element={<Register />} />
        <Route path="Login" element={<Login />} />
      </Routes>
    </Router>

</GoogleOAuthProvider>
   
  );
}

export default App;
