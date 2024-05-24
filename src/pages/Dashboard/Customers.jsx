import React, { useEffect, useState } from 'react';
import AlertMessage from '../../component/AlertMessage';
import { useUserContext } from '../../Context/userContext';
import UserDisplay from '../../component/UserDisplay ';

const Customers = () => {
  const [users, setUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const usersPerPage = 10;
  const { getAllUsers, deleteUser } = useUserContext();

  const handleGetAllUsers = async () => {
    setIsLoading(true);
    try {
      const allUsers = await getAllUsers();
      setUsers(allUsers.data);
      setTotalPages(Math.ceil(allUsers.data.length / usersPerPage));
      setCurrentPage(1);
    } catch (error) {
      console.log("Error fetching users:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (users.length) {
      const startIndex = (currentPage - 1) * usersPerPage;
      const endIndex = startIndex + usersPerPage;
      setDisplayedUsers(users.slice(startIndex, endIndex));
    }
  }, [currentPage, users]);

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

  const handleDelete = async (userId) => {
    setIsLoading(true);
    try {
      await deleteUser(userId);
      await handleGetAllUsers();
    } catch (error) {
      console.log("Error deleting user:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllUsers();
  }, []);

  return (
    <>
      <div className='mt-8'>
        {showAlert && <AlertMessage status="fail" message="No users found." onTrigger={new Date().getTime()} />}
        {displayedUsers.length > 0 ? (
          <UserDisplay users={displayedUsers} onDelete={handleDelete} />
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-gray-500 text-lg">No users to display</p>
          </div>
        )}
        <div className='flex justify-center space-x-2 mt-4'>
          {paginationControls()}
        </div>
      </div>
    </>
  );
};

export default Customers;
