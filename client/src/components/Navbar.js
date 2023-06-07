import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import socket from '../WebSocket';


const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const { state } = location;
        if (state && state.loginUserId && state.loginUserId.length !== 0) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [location]);


    const handleLogout = () => {
        setIsLoggedIn(false);
        
        navigate('/login', { state: {} });
    };


    const handleProfileClick = () => {
        navigate('/profile', { state: location.state });
    };


    const handleHomeClick = () => {
        navigate('/', { state: location.state });
    };

    return (
        <header>
            {isLoggedIn ? (
                <div className="container">
                    <button onClick={handleProfileClick}>Profile Page</button>
                    <button onClick={handleHomeClick}>Beefreal</button>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={() => navigate('/login')}>Login</button>
            )}
        </header>
    );
};


export default Navbar;
