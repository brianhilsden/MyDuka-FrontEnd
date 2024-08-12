import React, { useState, useEffect } from 'react';
import AdminItem from '../AdminItem/AdminItem';
import Sidebar from '../Sidebar/Sidebar';
import AddAdminForm from '../AddAdminForm/AddAdminForm';
import styles from './MerchantDashboard.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MerchantDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const [storeSales, setStoreSales] = useState([]);

    useEffect(() => {
        fetch("https://my-duka-back-end.vercel.app/getAdmins")
            .then(response => response.json())
            .then(data => setAdmins(data))
            .catch(error => console.error(error));

        // Fetch store sales data
        fetch("https://my-duka-back-end.vercel.app/getStoreSales")
            .then(response => response.json())
            .then(data => setStoreSales(data))
            .catch(error => console.error(error));
    }, []);

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
