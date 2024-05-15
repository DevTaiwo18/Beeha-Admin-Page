import React, { useState, useEffect } from 'react';
import '../styles/AddProduct.css';
import { useProductContext } from '../Context/productContext';
import AlertMessage from './AlertMessage';

const EditProduct = ({ isOpen, toggleForm, productToEdit, onProductUpdated }) => {
    const [product, setProduct] = useState(productToEdit);
    const { updateProduct } = useProductContext();
    const [alert, setAlert] = useState({ show: false, message: '', status: '' });
    const [alertTrigger, setAlertTrigger] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setProduct(productToEdit);
    }, [productToEdit]);

    const handleChange = (e, size) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            setProduct(prevState => ({
                ...prevState,
                sizes: [...prevState.sizes, size]
            }));
        } else {
            setProduct(prevState => ({
                ...prevState,
                sizes: prevState.sizes.filter(s => s !== size)
            }));
        }
    };

    const handleCategoryChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product.name || !product.description || !product.price || !product.category || !product.stock) {
            setAlert({ show: true, message: 'Please fill in all fields.', status: 'fail' });
            setAlertTrigger(new Date().getTime());
            return;
        }
    
        const { images, ...productDataWithoutImages } = product;
    
        handleUpdateProduct(productDataWithoutImages);
    };
    

    const handleUpdateProduct = async (productData) => {
        setIsLoading(true);

        try {
            const productResponse = await updateProduct(product._id, productData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (productResponse && !productResponse.error) {
                onProductUpdated();
                setAlert({ show: true, message: 'Product updated successfully!', status: 'success' });
            }
        } catch (error) {
            console.error("Failed to update product:", error.message);
            setAlert({ show: true, message: error.message, status: 'fail' });
        } finally {
            setIsLoading(false);
            setAlertTrigger(new Date().getTime());
        }
    };


    if (!isOpen) return null;

    return (
        <>
            {alert.show && (
                <AlertMessage
                    status={alert.status}
                    message={alert.message}
                    onTrigger={alertTrigger}
                />
            )}
            <div className="add-product-overlay" onClick={toggleForm}></div>
            <div className="add-product-form">
                <form onSubmit={handleSubmit}>
                    <label>Product Title/Name:</label>
                    <input type="text" name="name" value={product.name} onChange={(e) => handleCategoryChange(e)} placeholder="Product Title/Name" />

                    <label>Product Description:</label>
                    <textarea name="description" value={product.description} onChange={(e) => handleCategoryChange(e)} placeholder="Product Description" />

                    <label>Price:</label>
                    <input type="text" name="price" value={product.price} onChange={(e) => handleCategoryChange(e)} placeholder="Enter price" />

                    <label>Category:</label>
                    <select name="category" value={product.category} onChange={(e) => handleCategoryChange(e)}>
                        <option value="">Select a category</option>
                        <option value="Cloth">Cloth</option>
                        <option value="Bags">Bags</option>
                        <option value="Shoes">Shoes</option>
                    </select>

                    <label>Sizes:</label>
                    <div className="sizes-container">
                        {['XS', 'S', 'M', 'L', 'XL', 'One Size'].map(size => (
                            <label key={size} className="size-label">
                                <input
                                    type="checkbox"
                                    checked={product.sizes.includes(size)}
                                    onChange={(e) => handleChange(e, size)}
                                    className='mr-1'
                                />
                                {size}
                            </label>
                        ))}
                    </div>

                    <label>Stock:</label>
                    <input type="text" name="stock" value={product.stock} onChange={(e) => handleCategoryChange(e)} placeholder="Enter stock quantity" />

                    <div className="buttons">
                        <button type="submit" disabled={isLoading} className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-white">
                            {isLoading ? (
                                <>
                                    <svg aria-hidden="true" role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"></path>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3321 21.5675 82.5849 25.841C84.9136 28.9136 86.7993 32.2918 88.1813  3.8755C89.083 38.2098 91.5422 39.678 93.9676 39.0409Z" fill="currentColor"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : (
                                'Update Product'
                            )}
                        </button>
                        <button type="button" onClick={toggleForm} className="bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 text-white">Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;

