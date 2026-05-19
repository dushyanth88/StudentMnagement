import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    Student Management System
                </Link>
                <div className="nav-menu">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/add-student" className="nav-item nav-button">+ Add Student</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
