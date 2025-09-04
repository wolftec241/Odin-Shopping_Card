import React from "react";
import { Link } from "react-router";
import "./styles/NavBar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-left">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
        </div>
        <div className="navbar-right">
            <a href="/cart">Cart</a>
        </div>
    </nav>
  );
}