import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProductContext } from '../../Context/productContext';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/Home.css"

const SingleProduct = () => {
    const { Id } = useParams();
    const { getProductById } = useProductContext();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) {
            return '₦0.00';
        }
        const formattedAmount = amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
        return `₦${formattedAmount.endsWith('.00') ? formattedAmount : formattedAmount + '.00'}`;
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const result = await getProductById(Id);
                if (result.status === 'success') {
                    setProduct(result.data.product);
                } else {
                    throw new Error('Failed to fetch product details');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchProduct();
    }, [Id, getProductById]);

    if (error) {
        return <div className="text-red-500 text-center font-bold">Error: {error}</div>;
    }

    if (!product) {
        return <div className="text-gray-500 text-center font-bold">Loading...</div>;
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="product-details flex flex-col md:flex-row mt-10 gap-5 items-start">
            <div className="w-full md:w-1/2 mt-20">
                {product.images && product.images.length > 1 ? (
                    <Slider {...settings}>
                        {product.images.map((img, index) => (
                            <div key={index}>
                                <img src={img} alt={product.name} style={{ width: '100%', maxHeight: '400px', display: 'block' }} />
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <img src={product.images[0]} alt={product.name} style={{ width: '100%', maxHeight: '400px' }} />
                )}
            </div>
            <div className="w-full md:w-1/2 p-4 text-gray-800">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="my-4 text-lg">{product.description}</p>
                <div className="text-2xl font-semibold">
                    <strong>Price:</strong> {formatCurrency(product.price)}
                </div>
                <div className="my-2">
                    <strong>Category:</strong> {product.category}
                </div>
                <div className="mb-2">
                    <strong>Stock:</strong> {product.stock}
                </div>
                <ul className="list-none flex flex-wrap">
                    <strong className='mr-2'>Sizes:</strong>
                    {product.sizes.map(size => (
                        <li key={size} className="text-sm mr-2 mt-1">{size}</li>
                    ))}
                </ul>

                <button className='mt-4'>
                    <Link to="/dashboard/product" className="bg-brandBrown hover:bg-brandBrown text-white font-bold py-2 px-4 rounded">
                        Back
                    </Link>
                </button>

            </div>
        </div>
    );
}

export default SingleProduct;
