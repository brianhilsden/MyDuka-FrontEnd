import React, { useState } from 'react';
import styles from './AdminItem.module.css';
import { useNavigate } from 'react-router-dom';

const AdminItem = ({ admin }) => {
    const navigate = useNavigate()
    const [status,setStatus] = useState(admin.account_status)
    const handleDelete = async () => {
        try {
            const response = await fetch(`https://my-duka-back-end.vercel.app/adminAccountStatus/${admin.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(`Deleted ${admin.name}`);
                // Optionally, you can trigger a refresh or update the state here
            } else {
                console.error('Error deleting admin:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting admin:', error);
        }
    };

    const handleInactivate = async () => {
        try {
            fetch(`https://my-duka-back-end.vercel.app/adminAccountStatus/${admin.id}`)
            .then(response=>{
                if (response.ok) {
                    
                    console.log(`Inactivated ${admin.username}`);
                    // Optionally, you can trigger a refresh or update the state here
                    return response.json()
                } else {
                    console.error('Error inactivating merchant:', response.statusText);
                }

            }).then(data=>setStatus(data.status)
            )
            
           
        } catch (error) {
            console.error('Error inactivating merchant:', error);
        }
    };

    return (
        <div className={styles.adminItem}>
            <span>{`ADMIN ${admin.id} [${admin.username}]`}</span>
            <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
            <button onClick={handleInactivate} className={`${styles.button} ${styles.inactivateButton}`}>{status}</button>
            <button className={`${styles.button} ${styles.viewButton}`} onClick={()=>navigate(`/admin/${admin.id}`)}>View Store</button>
        </div>
    );
};

export default AdminItem;
