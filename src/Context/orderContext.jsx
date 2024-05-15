import { createContext, useContext } from "react";
import axios from 'axios';

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

const OrderProvider = ({ children }) => {

    const apiUrl = import.meta.env.VITE_apiUrl;

    const getOrderSummary = async () => {
        try {
            const orderSummary = await axios.get(`${apiUrl}/admin/order-summaries`)
            return orderSummary.data
        } catch (error) {
            const errorMessage = error.message
        }
    }

    const getDashboardMetrics = async () => {
        try {
            const dashboardMetrics = await axios.get(`${apiUrl}/admin/dashboard-metrics`)
            return dashboardMetrics.data
        } catch (error) {
            const errorMessage = error.message
        }
    }


    const values = {
        getOrderSummary,
        getDashboardMetrics
    };

    return (
        <OrderContext.Provider value={values}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
