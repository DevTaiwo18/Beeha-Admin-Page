import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBox, FaUsers, FaShoppingCart, FaTruck } from 'react-icons/fa';

const VerticalNavBar = ({ isOpen, closeNavbar }) => {
    const navigate = useNavigate();

    const handleLinkClick = (path) => {
        return (event) => {
            event.preventDefault(); 
            closeNavbar(); 
            navigate(path); 
        };
    };

    return (
        <div className={`fixed lg:relative lg:top-16 bg-black text-white w-64 p-5 overflow-y-auto transition-all duration-300 ease-in-out
                         ${isOpen ? 'top-16 h-[calc(100vh-4rem)]' : 'top-[-100%] h-0 lg:h-[calc(100vh-64px)] lg:top-0'}`}>
            <ul className="space-y-3">
                <li>
                    <Link to="/dashboard/home" onClick={handleLinkClick('/dashboard/home')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded">
                        <FaHome /><span>Dashboard</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/product" onClick={handleLinkClick('/dashboard/product')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded">
                        <FaBox /><span>Products</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/shipping" onClick={handleLinkClick('/dashboard/shipping')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded">
                        <FaTruck /><span>Shipping</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/customer" onClick={handleLinkClick('/dashboard/customer')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded">
                        <FaUsers /><span>Customers</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dashboard/order" onClick={handleLinkClick('/dashboard/order')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded">
                        <FaShoppingCart /><span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link to="/" onClick={handleLinkClick('/')} className="flex items-center space-x-2 hover:text-gray-300 p-2 rounded transition-colors duration-200 ease-in-out">
                        <i className="fas fa-sign-out-alt mt-0.5"></i><span>Log Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default VerticalNavBar;
