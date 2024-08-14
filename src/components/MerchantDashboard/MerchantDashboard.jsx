import React, { useState, useEffect } from 'react';
import AdminItem from '../AdminItem/AdminItem';
import Sidebar from '../Sidebar/Sidebar';
import AddAdminForm from '../AddAdminForm/AddAdminForm';
import styles from './MerchantDashboard.module.css';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MerchantDashboard = () => {
    const [admins, setAdmins] = useState([]);
    const user = useSelector(state => state.user.user);
    const [stores,setStores] = useState([])
   

    const removeAdmin = (id) => {
        setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
    };
    useEffect(() => {
        fetch("https://my-duka-back-end.vercel.app/getAdmins")
        .then((response) => response.json())
        .then((data) => setAdmins(data))
        .catch((error) => console.error(error));
    }, []);
  

   
    // Mock data for store sales
    

    useEffect(() => {
        fetch("https://my-duka-back-end.vercel.app/stores")
        .then(res=>res.json())
        .then(data=>setStores(data))
        // Using mock data instead of fetching from an API
        
       
        // eslint-disable-next-line
    }, [admins,user,stores]);

  
    const [isAddAdminFormVisible, setIsAddAdminFormVisible] = useState(false);

    const toggleAddAdminForm = () => {
        setIsAddAdminFormVisible(!isAddAdminFormVisible);
    };
    const storeSales = stores.map(store => {
        const totalSales = store.salesReports.reduce((acc, report) => acc + report.quantity_sold, 0);
        return {
            storeName: store.name,
            sales: totalSales
        };
    });
   

 


    if (user.role === "Merchant") {
    return (

        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Merchant Dashboard - {user.username}</h1>
                    <button onClick={toggleAddAdminForm} className={styles.addButton}>Add Admin</button>
                </div>
                {admins.map(admin => (
                    <AdminItem key={admin.id} admin={admin} removeAdmin={removeAdmin}/>
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
}
  
};

export default MerchantDashboard;