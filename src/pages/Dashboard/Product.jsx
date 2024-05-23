import React, { useEffect, useState } from 'react';
import "../../styles/Home.css";
import ProductDisplay from '../../component/ProductDisplay';
import AlertMessage from '../../component/AlertMessage';
import AddProduct from '../../component/AddProduct';
import { useProductContext } from '../../Context/productContext';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [category, setCategory] = useState('');
    const [filteringLoading, setFilteringLoading] = useState(false);
    const [resettingLoading, setResettingLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const productsPerPage = 10;
    const { getAllProducts, getsearch } = useProductContext();
    const [showAddProduct, setShowAddProduct] = useState(false);

    const toggleAddProductForm = () => {
        setShowAddProduct(!showAddProduct);
    };


    const handleGetAllProducts = async () => {
        try {
            const allProducts = await getAllProducts();
            setProducts(allProducts.data.products);
            setTotalPages(Math.ceil(allProducts.data.products.length / productsPerPage));
            setCurrentPage(1);
        } catch (error) {
            const errorMessage = error.message;
            console.log(errorMessage);
        }
    };

    useEffect(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        setDisplayedProducts(products.slice(startIndex, endIndex));
    }, [currentPage, products]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const paginationControls = () => {
        return Array.from({ length: totalPages }, (_, index) => (
            <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                style={{
                    padding: '3px 11px',
                    margin: '10px 4px',
                    border: '2px solid #6e260e',
                    background: '#6e260e',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    fontWeight: 'bold'
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = '#6e260e', e.currentTarget.style.color = 'white')}
                onMouseOut={(e) => (e.currentTarget.style.background = '#6e260e', e.currentTarget.style.color = 'white')}
            >
                {index + 1}
            </button>
        ));
    };

    const handleSearch = async () => {
        setFilteringLoading(true);
        try {
            if (searchName.trim() || category) {
                const result = await getsearch(searchName, category);
                if (result === undefined || result.data.length === 0) {
                    handleReset();
                } else {
                    setProducts(result.data);
                    setTotalPages(Math.ceil(result.data.length / productsPerPage));
                    setShowAlert(false);
                    setCurrentPage(1);
                }
            } else {
                await handleGetAllProducts();
                setShowAlert(false);
            }
        } catch (error) {
            console.log(error.message);
        }
        setFilteringLoading(false);
    };

    const handleReset = async () => {
        setResettingLoading(true);
        setSearchName('');
        setCategory('');
        await handleGetAllProducts();
        setResettingLoading(false);
    };

    useEffect(() => {
        handleGetAllProducts();
    }, []);

    return (
        <>
            <div className="bg-brandBrown px-4 py-5 flex items-center gap-6 prod">
                <input
                    className="text-sm placeholder-gray-400 text-black bg-white-400 px-2 py-3 rounded-md w-full focus:outline-none"
                    type="text"
                    placeholder="Search Product with Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <select
                    className="text-sm text-white bg-black focus:outline-none px-2 py-3 rounded-md w-full font-bold"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">Category</option>
                    <option value="Cloth">Cloth</option>
                    <option value="Bags">Bags</option>
                    <option value="Shoes">Shoes</option>
                </select>
                <button
                    className="text-sm text-white bg-black px-4 py-3 rounded-md hover:bg-black w-full font-bold"
                    onClick={handleSearch}
                    disabled={filteringLoading}
                >
                    {filteringLoading ? 'Filtering...' : 'Filter'}
                </button>
                <button
                    className="text-sm text-white bg-black px-4 py-3 rounded-md hover:bg-black w-full font-bold"
                    onClick={handleReset}
                    disabled={resettingLoading}
                >
                    {resettingLoading ? 'Resetting...' : 'Reset'}
                </button>
                <button
                    className="text-sm text-white bg-black px-4 py-3 rounded-md hover:bg-black w-full font-bold"
                    onClick={toggleAddProductForm}
                >
                    Add Product
                </button>
            </div>

            <AddProduct isOpen={showAddProduct} toggleForm={toggleAddProductForm} onProductAdded={handleGetAllProducts} />

            <div className='mt-8'>
                {showAlert && <AlertMessage status="fail" message="No products found." onTrigger={new Date().getTime()} />}
                <ProductDisplay products={displayedProducts} onProductAdded={handleGetAllProducts} />
                <div className='flex justify-center space-x-2 mt-4'>
                    {paginationControls()}
                </div>
            </div>
        </>
    );
};

export default Product;
