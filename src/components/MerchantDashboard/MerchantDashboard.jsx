
import React, { useState, useEffect } from 'react';
import AdminItem from '../AdminItem/AdminItem';
import Sidebar from '../Sidebar/Sidebar';
import AddAdminForm from '../AddAdminForm/AddAdminForm';
import styles from './MerchantDashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MerchantDashboard = () => {
    const [admins, setAdmins] = useState([]);

    // Mock data for admins
    const mockAdmins = [
        { id: 1, name: 'Admin 1', email: 'admin1@example.com' },
        { id: 2, name: 'Admin 2', email: 'admin2@example.com' },
        { id: 3, name: 'Admin 3', email: 'admin3@example.com' }
    ];

    // Mock data for store sales
    const mockStoreSales = [
        { storeName: "Store 1", sales: 1000 },
        { storeName: "Store 2", sales: 850 },
        { storeName: "Store 3", sales: 920 }
    ];

    useEffect(() => {
        // Using mock data instead of fetching from an API
        setAdmins(mockAdmins);
        setStoreSales(mockStoreSales);
    }, []);

    const [storeSales, setStoreSales] = useState([]);
    const [isAddAdminFormVisible, setIsAddAdminFormVisible] = useState(false);

    const toggleAddAdminForm = () => {
        setIsAddAdminFormVisible(!isAddAdminFormVisible);
    };

    console.log(admins);
    console.log(storeSales);


 
    return (

        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Merchant Dashboard</h1>
                    <button onClick={toggleAddAdminForm} className={styles.addButton}>Add Admin</button>
                </div>
                {admins.map(admin => (
                    <AdminItem key={admin.id} admin={admin} />
                ))}
                <div className={styles.sales}>
                    <h3>Top 3 Stores by Sales</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={storeSales}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="storeName" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                {isAddAdminFormVisible && <AddAdminForm onClose={toggleAddAdminForm} />}
            </div>

        </div>
    
    );
  
};

export default MerchantDashboard;
