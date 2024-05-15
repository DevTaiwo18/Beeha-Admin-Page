import { createContext, useContext } from "react";
import axios from "axios";
import Shipping from "../pages/Dashboard/Shipping";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);


const ProductProvider = ({ children }) => {

    const apiUrl = import.meta.env.VITE_apiUrl;


    const getAllProducts = async () => {
        try {
            const products = await axios.get(`${apiUrl}/product/getproducts`)
            return products.data;
        } catch (error) {
            const errorMessage = error.message
        }
    }

    const getproductStatus = async () => {
        try {
            const productStatus = await axios.get(`${apiUrl}/admin/stock-status`)
            return productStatus.data;
        } catch (error) {
            const errorMessage = error.message
        }
    }

    const getProductById = async (id) => {
        try {
            const product = await axios.get(`${apiUrl}/product/${id}`)
            return product.data;
        } catch (error) {
            const errorMessage = error.message
        }
    }

    const getsearch = async (name, category) => {
        try {
            const product = await axios.get(`${apiUrl}/admin/product/${name}/${category}`)
            return product.data;
        } catch (error) {
            const errorMessage = error.message
        }
    }

    const addProduct = async (productData) => {
        try {
            const response = await axios.post(`${apiUrl}/product/addproducts`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response.data;
        } catch (error) {
            console.error("Failed to add product:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    const deleteProduct = async (productId) => {
        try {
            const response = await axios.delete(`${apiUrl}/product/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Failed to delete product:", error.response ? error.response.data : error.message);
            return null;
        }
    }

    const updateProduct = async (productId, productData) => {
        console.log(productId, productData);
        try {
            const response = await fetch(`${apiUrl}/product/${productId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to update product:', error.message);
            return null;
        }
    };

    const getAllshippingMethods = async () => {
        try {
            const shippingMethods = await axios.get(`${apiUrl}/admin/shipping`)
            return shippingMethods.data.data;
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage);
        }
    }

    const addShippingMethod = async (shippingMethods) => {
        try {
            const response = await axios.post(`${apiUrl}/admin/shipping`, shippingMethods)
            return response.data;
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage);
        }
    }

    const updateShipping = async (ShippingId, shippingMethods) => {
        try {
            const response = await axios.patch(`${apiUrl}/admin/shipping/${ShippingId}`, shippingMethods)
            return response.data;
        } catch (error) {
            const errorMessage = error.message
            console.log(error);
        }
    }

    const deleteShipping = async (ShippingId) => {
        try {
            const response = await axios.delete(`${apiUrl}/admin/shipping/${ShippingId}`)
            return response.data;
        } catch (error) {
            const errorMessage = error.message
            console.log(errorMessage);
        }
    }

    const values = {
        getAllProducts,
        getproductStatus,
        getProductById,
        getsearch,
        addProduct,
        deleteProduct,
        updateProduct,
        getAllshippingMethods,
        addShippingMethod,
        updateShipping,
        deleteShipping
    }

    return (
        <ProductContext.Provider value={values}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;