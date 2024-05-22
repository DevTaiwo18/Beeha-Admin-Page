import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import image from '../assets/download (1).png'


const HorizontalNavbar = ({ toggleNav }) => {
    return (
        <div className="bg-[rgb(110,38,14)] text-white flex justify-between items-center px-4 fixed w-full z-10">
            <div className="logo">
                <img src={image} alt="Logo" className="h-16 w-auto" />
            </div>
            <div className='pr-5'>
                <button onClick={toggleNav} className="text-white text-xl lg:hidden">
                    <FaBars />
                </button>
                <Link to="/" className="hidden lg:flex items-center space-x-2">
                    <i className="fas fa-sign-out-alt mt-0.5"></i>
                    <span>Log Out</span>
                </Link>
            </div>
        </div>
    );
};

export default HorizontalNavbar;
