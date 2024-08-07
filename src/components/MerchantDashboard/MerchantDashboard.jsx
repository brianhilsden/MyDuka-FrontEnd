import React, { useState } from 'react';
import MerchantItem from '../MerchantItem/MerchantItem';
import Sidebar from '../Sidebar/Sidebar';
import AddAdminForm from '../AddAdminForm/AddAdminForm';
import styles from './MerchantDashboard.module.css';

const merchants = [
    { id: 1,  storeLink: '#' },
    { id: 2,  storeLink: '#' },
    { id: 3,  storeLink: '#' }
];

const MerchantDashboard = () => {
    const [isAddAdminFormVisible, setIsAddAdminFormVisible] = useState(false);

    const toggleAddAdminForm = () => {
        setIsAddAdminFormVisible(!isAddAdminFormVisible);
    };

    return (
        <div className={styles.container}>
            <Sidebar />
            <div className={styles.mainContent}>
                <div className={styles.header}>
                    <h1>Merchant</h1>
                    <button onClick={toggleAddAdminForm} className={styles.addButton}>Add Admin</button>
                </div>
                {merchants.map(merchant => (
                    <MerchantItem key={merchant.id} merchant={merchant} />
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

