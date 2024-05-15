import React, { useEffect, useState } from 'react';
import { useProductContext } from '../../Context/productContext';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Shipping = () => {
  const { getAllshippingMethods, addShippingMethod, updateShipping, deleteShipping } = useProductContext();
  const [shippingMethods, setShippingMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [fullDescription, setFullDescription] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newShippingData, setNewShippingData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingShipping, setEditingShipping] = useState(null);


  useEffect(() => {
    fetchShippingMethods();
  }, []);

  const fetchShippingMethods = async () => {
    try {
      const allshippingMethods = await getAllshippingMethods();
      setShippingMethods(allshippingMethods);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (shipping) => {
    setIsEditing(true);
    setEditingShipping(shipping);
    setShowAddModal(true);
    setNewShippingData({
      title: shipping.title,
      description: shipping.description,
      price: shipping.price
    });
  };


  const handleDeleteClick = async (shippingId) => {
    try {
      await deleteShipping(shippingId);
      fetchShippingMethods();
    } catch (error) {
      console.log('Error deleting shipping:', error.message);
    }
  };

  const toggleFullDescription = (description) => {
    setFullDescription(description);
    setShowFullDescription(!showFullDescription);
  };

  const handleAddModalOpen = () => {
    setShowAddModal(true);
  };

  const handleAddModalClose = () => {
    setShowAddModal(false);
    setNewShippingData({
      title: '',
      description: '',
      price: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewShippingData({
      ...newShippingData,
      [name]: value
    });
  };

  const handleAddShipping = async () => {
    setIsAddLoading(true);
    try {
      const price = parseFloat(newShippingData.price);

      const newData = {
        ...newShippingData,
        price: price
      };

      let shipp = await addShippingMethod(newData);
      if (shipp && !shipp.error) {
        handleAddModalClose();
        fetchShippingMethods();
      }

    } catch (error) {
      console.log('Error adding shipping:', error.message);
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    setIsAddLoading(true);
    try {
      const price = parseFloat(newShippingData.price);


      const newData = {
        ...newShippingData,
        price: price
      };

      let updatedShipping = await updateShipping(editingShipping._id, newData);
      if (updatedShipping && !updatedShipping.error) {
        handleAddModalClose();
        fetchShippingMethods();
      }
    } catch (error) {
      console.log('Error updating shipping:', error.message);
    } finally {
      setIsAddLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) {
      return '₦0.00';
    }
    const formattedAmount = amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return `₦${formattedAmount.endsWith('.00') ? formattedAmount : formattedAmount + '.00'}`;
  };

  return (
    <div className="overflow-x-auto">
      <div className='mb-10'>
        <header className="p-4 bg-brandBrown text-white">
          <div className="container mx-auto flex justify-center md:justify-between items-center flex-wrap md:flex-no-wrap">
            <h1 className="text-sm md:text-sm lg:text-md font-semibold text-center md:text-left w-full md:w-auto mb-4 md:mb-0">Shipping Management</h1>
            <button className="py-2 px-4 bg-black text-sm md:text-sm text-white font-semibold rounded" onClick={handleAddModalOpen}>
              Add Shipping
            </button>
          </div>
        </header>
      </div>

      <table className="min-w-full bg-white text-center mb-10">
        <thead>
          <tr className="tee w-full bg-brandBrown text-white text-sm">
            <th className="py-2 px-4">Title</th>
            <th className="py-2 px-4">Description</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="4" className="py-4 text-center">Loading...</td>
            </tr>
          ) : shippingMethods.map((shipping) => (
            <tr key={shipping._id} className="tdd text-center border-b text-sm text-black">
              <td className="py-2 px-4">{shipping.title}</td>
              <td className="py-2 px-4">
                {shipping.description.split(' ').slice(0, 2).join(' ')}{' '}
                {shipping.description.split(' ').length > 2 && (
                  <button className="text-blue-500 hover:underline" onClick={() => toggleFullDescription(shipping.description)}>
                    Read more
                  </button>
                )}
              </td>
              <td className="py-2 px-4">{formatCurrency(shipping.price)}</td>
              <td className="py-2 px-4">
                <button onClick={() => handleEditClick(shipping)} className="text-green-500 hover:text-green-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteClick(shipping._id)} className="text-red-500 hover:text-red-700 ml-2">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showFullDescription && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md max-w-md">
            <h2 className="text-lg font-semibold text-black mb-4 text-sm">Full Description</h2>
            <p className="text-black text-sm">{fullDescription}</p>
            <button className="mt-4 bg-brandBrown text-white py-1 px-2 text-sm rounded" onClick={() => setShowFullDescription(false)}>Close</button>
          </div>
        </div>
      )}

      {
        showAddModal && (
          <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-md max-w-2xl mt-20">
              <h2 className="text-lg font-semibold text-black mb-4 text-sm">{isEditing ? 'Edit Shipping' : 'Add Shipping'}</h2>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="title" name="title" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none" value={newShippingData.title} onChange={handleInputChange} />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" name="description" rows="3" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none" value={newShippingData.description} onChange={handleInputChange}></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" id="price" name="price" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none" value={newShippingData.price} onChange={handleInputChange} />
              </div>
              <button
                className="mt-4 bg-brandBrown text-white py-1 px-2 text-sm rounded"
                onClick={isEditing ? handleSaveEdit : handleAddShipping}
                disabled={isAddLoading}
              >
                {isAddLoading ? 'Saving...' : isEditing ? 'Save' : 'Add'}
              </button>
              <button className="mt-4 bg-gray-300 text-black py-1 px-2 text-sm rounded ml-2" onClick={handleAddModalClose}>Cancel</button>
            </div>
          </div>
        )

      }
    </div >

  );
};

export default Shipping;
