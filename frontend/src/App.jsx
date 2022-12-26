import * as React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/Auth/AuthContext";
import { Contacts } from "./pages/Contacts";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contacts" element={<Contacts />} />
        </Routes>
      </AuthProvider>
    </>
  );
}
