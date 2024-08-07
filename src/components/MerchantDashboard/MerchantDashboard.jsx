import React, { useState, useEffect} from 'react';
import AdminItem from '../AdminItem/AdminItem';
import Sidebar from '../Sidebar/Sidebar';
import AddAdminForm from '../AddAdminForm/AddAdminForm';
import styles from './MerchantDashboard.module.css';

const MerchantDashboard = () => {
    const [admins,setAdmins]= useState ([])
    

useEffect (() => {
    fetch("https://my-duka-back-end.vercel.app/getAdmins").then(response => response.json())
    .then(data => setAdmins(data))
    .catch(error => console.error(error))
}, [])
    const [isAddAdminFormVisible, setIsAddAdminFormVisible] = useState(false);

    const toggleAddAdminForm = () => {
        setIsAddAdminFormVisible(!isAddAdminFormVisible);
    };
    console.log(admins)

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Merchant</h1>
                    <button onClick={toggleAddAdminForm} className={styles.addButton}>Add Admin</button>
                </div>
                {admins.map(admin => (
                    <AdminItem key={admin.id} admin={admin} />
                ))}
                <div className={styles.sales}>
                    <h3>Top 3 Stores by Sales</h3>
                    <ul>
                        
                    </ul>
                </div>
                {isAddAdminFormVisible && <AddAdminForm onClose={toggleAddAdminForm} />}
            </div>
        </div>
    );
};

export default MerchantDashboard;

