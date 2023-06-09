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
            socket.connect()
        } else {
            setIsLoggedIn(false);
            socket.disconnect()
        }
    }, [location]);


    const handleLogout = () => {
        setIsLoggedIn(false);
        socket.disconnect()
        navigate('/', { state: {} });
    };


    const handleProfileClick = () => {
        navigate('/profile', { state: location.state });
    };


    const handleHomeClick = () => {
        navigate('/home', { state: location.state });
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
                <div className="container">
                    <button onClick={() => navigate('/')}>Login</button>
                </div>
            )}
        </header>
    );
};


export default Navbar;
