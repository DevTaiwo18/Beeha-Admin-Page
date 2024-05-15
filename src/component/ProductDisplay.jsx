import React, { useEffect, useState, Fragment } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useProductContext } from '../Context/productContext';
import { Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import "../styles/Home.css"
import { BsExclamation } from 'react-icons/bs';
import EditProduct from './EditProduct';

const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) {
        return '₦0.00';
    }
    const formattedAmount = amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return `₦${formattedAmount.endsWith('.00') ? formattedAmount : formattedAmount + '.00'}`;
};

const ProductDisplay = ({ products, onProductAdded }) => {
    const [productStatus, setProductsStatus] = useState([]);
    const { getproductStatus, deleteProduct } = useProductContext();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [isEditOpen, setIsEditOpen] = useState(false);

    const handleGetAllProductsStatus = async () => {
        try {
            const allProductsStatus = await getproductStatus();
            setProductsStatus(allProductsStatus.data);
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        handleGetAllProductsStatus();
    }, []);

    useEffect(() => {
        handleGetAllProductsStatus();
    }, [products.length]);

    const findStatusById = (id) => {
        const status = productStatus.find(status => status._id === id);
        return status ? status.status : 'Unknown';
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsLoading(true);
        try {
            let deleteFunction = await deleteProduct(selectedProduct._id);
            if (deleteFunction && !deleteFunction.error) {
                onProductAdded();
            }
            setOpen(false);
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditOpen(true);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                <thead>
                    <tr className="tee w-full bg-brandBrown text-white text-sm">
                        <th className="py-2 px-4">NAME</th>
                        <th className="py-2 px-4">CATEGORY</th>
                        <th className="py-2 px-4">PRICE</th>
                        <th className="py-2 px-4">STOCK</th>
                        <th className="py-2 px-4">STATUS</th>
                        <th className="py-2 px-4">VIEW</th>
                        <th className="py-2 px-4">ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="tdd text-center border-b text-sm text-black">
                            <td className="py-2 px-4">{product.name}</td>
                            <td className="py-2 px-4">{product.category}</td>
                            <td className="py-2 px-4">{formatCurrency(product.price)}</td>
                            <td className="py-2 px-4">{product.stock}</td>
                            <td className="py-2 px-4">
                                <span className={`px-3 py-1 rounded-full text-white ${product.stock === 0 ? 'bg-red-500' : 'bg-green-500'}`}>
                                    {findStatusById(product._id)}
                                </span>
                            </td>
                            <td className="py-2 px-4">
                                <button className="text-blue-500 hover:text-blue-700">
                                    <Link to={`/dashboard/${product._id}`} className="flex items-center justify-center w-full h-full">
                                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </Link>
                                </button>
                            </td>
                            <td className="py-2 px-4 flex justify-center items-center space-x-2">
                                <button onClick={() => handleEditClick(product)} className="text-green-500 hover:text-green-700">
                                    <FaEdit />
                                </button>
                                <button onClick={() => handleDeleteClick(product)} className="text-red-500 hover:text-red-700">
                                    <FaTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <BsExclamation className="h-6 w-6 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Delete Product
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete this product? This action cannot be undone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-4 sm:ml-10 sm:pl-4 sm:flex">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={handleConfirmDelete}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Deleting...' : 'Delete'}
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            {isEditOpen && (
                <EditProduct 
                    isOpen={isEditOpen} 
                    toggleForm={() => setIsEditOpen(false)} 
                    productToEdit={selectedProduct} 
                    onProductUpdated={() => {
                        setIsEditOpen(false);
                        onProductAdded(); 
                    }} 
                />
            )}
        </div >
    );
}

export default ProductDisplay;
