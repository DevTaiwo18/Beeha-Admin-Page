import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { FaShippingFast, FaRegCalendarAlt, FaCalendarAlt, FaCalendarCheck, FaDollarSign } from 'react-icons/fa';
import { useOrderContext } from '../../Context/orderContext';
import "../../styles/Home.css";

const Home = () => {
    const { getOrderSummary, getDashboardMetrics } = useOrderContext();
    const [orderSummary, setOrderSummary] = useState(null);
    const [dashboardMetrics, setDashboardMetrics] = useState(null);
    const [chartInstance, setChartInstance] = useState(null); 

    useEffect(() => {
        fetchOrderSummary();
        fetchDashboardMetrics();
    }, []);

    const fetchOrderSummary = async () => {
        try {
            const response = await getOrderSummary();
            setOrderSummary(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const fetchDashboardMetrics = async () => {
        try {
            const response = await getDashboardMetrics();
            setDashboardMetrics(response.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    const formatCurrency = (amount) => {
        if (amount === undefined || amount === null) {
            return '₦0.00';
        }
        const formattedAmount = amount.toLocaleString('en-US', { maximumFractionDigits: 2 });
        return `₦${formattedAmount.endsWith('.00') ? formattedAmount : formattedAmount + '.00'}`;
    };

    const chartData = {
        labels: ['Pending', 'Shipping', 'Delivered'],
        datasets: [{
            label: 'Order Status',
            data: [
                dashboardMetrics?.details[0]?.count || 0, 
                dashboardMetrics?.details[1]?.count || 0, 
                dashboardMetrics?.details[2]?.count || 0  
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)', 
                'rgba(54, 162, 235, 0.5)', 
                'rgba(75, 192, 192, 0.5)'   
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false 
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString();
                        }
                        return label;
                    }
                }
            }
        },
        layout: {
            padding: {
                left: 20,
                right: 20,
                top: 20,
                bottom: 20
            }
        }
    };

    useEffect(() => {
        if (dashboardMetrics) {
            if (chartInstance) {
                chartInstance.destroy();
            }
            const ctx = document.getElementById('orderStatusChart');
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
            setChartInstance(newChartInstance);
        }
    }, [dashboardMetrics]);

    const cards = [
        { title: 'Today Orders', total: formatCurrency(orderSummary?.today?.totalSales), color: 'bg-teal-500', icon: <FaShippingFast /> },
        { title: 'Yesterday Orders', total: formatCurrency(orderSummary?.yesterday?.totalSales), color: 'bg-orange-500', icon: <FaRegCalendarAlt /> },
        { title: 'This Month', total: formatCurrency(orderSummary?.thisMonth?.totalSales), color: 'bg-blue-500', icon: <FaCalendarAlt /> },
        { title: 'Last Month', total: formatCurrency(orderSummary?.lastMonth?.totalSales), color: 'bg-blue-600', icon: <FaCalendarCheck /> },
        { title: 'All-Time Sales', total: formatCurrency(orderSummary?.allTime?.totalSales), color: 'bg-green-500', icon: <FaDollarSign /> }
    ];

    const metricsCards = dashboardMetrics ? dashboardMetrics.details.map((metric, index) => (
        <div key={index} className="w-full px-5 py-4 m-1 md:m-2 text-white rounded bg flex shadow-lg items-center font-bold">
            <div className="flex items-center gap-10">
                <div className='text-justify'>
                    <div className="text-sm mb-2">
                        Orders {metric.status}
                    </div>
                    <div>
                        <h2 className="text-sm">{metric.count}</h2>
                    </div>
                </div>
            </div>
        </div>
    )) : null;

    return (
        <>
            <div className="flex justify-around text-center eee">
                {cards.map((card, index) => (
                    <div key={index} className={`w-full px-5 py-10 m-1 md:m-2 text-white rounded ${card.color} flex flex-col justify-around shadow-lg items-center font-bold`}>
                        <div className="text-lg mb-2">
                            {card.icon}
                        </div>
                        <div>
                            <h3 className="text-md mb-3 mt-2">{card.title}</h3>
                            <h2 className="text-sm">{card.total ?? '₦0.00'}</h2>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-around text-center eee">
                {metricsCards}
            </div>

            <div className="flex justify-between text-center">
                <canvas id="orderStatusChart"></canvas>
            </div>
        </>
    );
};

export default Home;
