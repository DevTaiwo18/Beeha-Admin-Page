import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import HorizontalNavbar from '../../component/HorizontalNavbar';
import VerticalNavBar from '../../component/VerticalNavBar';
import Home from './Home';
import Product from './Product';
import Order from './Order';
import Customers from './Customers';
import OrderProvider from '../../Context/orderContext';
import Shipping from './Shipping';
import ProductProvider from '../../Context/productContext';
import SingleProduct from './SingleProduct';

const RouteLink = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => setNavOpen(!navOpen);

    const closeNavbar = () => {
        setNavOpen(false); 
    };

    return (
        <div className="flex flex-col h-screen">
            <OrderProvider>
                <ProductProvider>
                    <HorizontalNavbar toggleNav={toggleNav} />
                    <div className="flex flex-1 overflow-hidden">
                        <div>
                            <VerticalNavBar isOpen={navOpen} closeNavbar={closeNavbar} />
                        </div>
                        <div className="flex-1 overflow-auto px-5 pt-20">
                            <Routes>
                                <Route path="/home" element={<Home />} />
                                <Route path="/product" element={<Product />} />
                                <Route path="/customer" element={<Customers />} />
                                <Route path="/order" element={<Order />} />
                                <Route path="/shipping" element={<Shipping />} />
                                <Route path="/:Id" element={<SingleProduct />} />
                            </Routes>
                        </div>
                    </div>
                </ProductProvider>
            </OrderProvider>
        </div>
    );
}

export default RouteLink;
