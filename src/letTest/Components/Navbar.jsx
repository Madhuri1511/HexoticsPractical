import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Changed useHistory to useNavigate

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();  // useNavigate hook

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');  // Use navigate() for redirect
    };

    return (
        <nav className="navbar">
            <div className="logo">Product Management</div>
            <div className="nav-links">
                {!user ? (
                    <>
                        <Link to="/signup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                ) : (
                    <>
                        <span>Welcome, {user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
