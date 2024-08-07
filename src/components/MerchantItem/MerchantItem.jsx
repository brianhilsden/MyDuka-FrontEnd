import React from 'react';
import styles from './MerchantItem.module.css';

const MerchantItem = ({ merchant }) => {
    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/merchants/${merchant.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log(`Deleted ${merchant.name}`);
                // Optionally, you can trigger a refresh or update the state here
            } else {
                console.error('Error deleting merchant:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting merchant:', error);
        }
    };

    const handleInactivate = async () => {
        try {
            const response = await fetch(`/api/merchants/${merchant.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'inactive' })
            });

            if (response.ok) {
                console.log(`Inactivated ${merchant.name}`);
                // Optionally, you can trigger a refresh or update the state here
            } else {
                console.error('Error inactivating merchant:', response.statusText);
            }
        } catch (error) {
            console.error('Error inactivating merchant:', error);
        }
    };

    return (
        <div className={styles.merchantItem}>
            <span>{`ADMIN ${merchant.id} [${merchant.name}]`}</span>
            <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>Delete</button>
            <button onClick={handleInactivate} className={`${styles.button} ${styles.inactivateButton}`}>Inactivate</button>
            <a href={merchant.storeLink} className={`${styles.button} ${styles.viewButton}`}>View Store</a>
        </div>
    );
};

export default MerchantItem;
