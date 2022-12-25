import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Contacts } from "./pages/Contacts";
import { Login } from "./pages/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/contacts" element={<Contacts />} />
      </Routes>
    </>
  );
}
