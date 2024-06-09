import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTv } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();

    const handleHeaderClick = () => {
        navigate('/');
    };

    return (
        <header className="bg-blue-500 p-8 text-white">
            <div className="container mx-auto flex items-center cursor-pointer" onClick={handleHeaderClick}>
                <FaTv className="text-4xl mr-4" />
                <h1 className="text-3xl">Movie Search App</h1>
            </div>
        </header>
    );
};

export default Header;
