import { createContext, useContext } from "react";
import axios from 'axios';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

const UserProvider = ({ children }) => {
    const apiUrl = import.meta.env.VITE_apiUrl;

    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${apiUrl}/admin/users`);
            return response.data;
        } catch (error) {
            console.error("Error fetching all users:", error.message);
            throw error;
        }
    };

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${apiUrl}/admin/users/${userId}`);
        } catch (error) {
            console.error("Error deleting user:", error.message);
            throw error;
        }
    };

    const values = {
        getAllUsers,
        deleteUser,
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
