import React from "react";
import { Routes, Route } from "react-router";
import Navbar from "./NavBar.tsx";
import Home from "./Home.tsx";
import ErrorPage from "./ErrorPage.tsx";
import "./styles/App.css";

export default function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes as needed */}

          {/* Fallback route for undefined paths */}
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </div>
    </>
  );
}