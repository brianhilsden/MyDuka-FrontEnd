import React, { useEffect, useState } from 'react';
import styles from './AddAdminForm.module.css';

const AddAdminForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [storeName, setStoreName] = useState()
    const [stores,setStores] = useState()


    useEffect(()=>{
        fetch("https://my-duka-back-end.vercel.app/stores")
        .then(res=>res.json())
        .then(data=>setStores(data))

    },[])
   
    
  
    
    

    const handleSubmit = (e) => {
        e.preventDefault();
       
        const selectedStoreId = stores.find(store => store.name === storeName)?.id;
       

        if (!selectedStoreId) {
            alert('Store not found or not selected.');
            return;
        }

        fetch("https://my-duka-back-end.vercel.app/inviteAdmin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",

            },
            body:JSON.stringify({ store_id: selectedStoreId, email: email })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
          ;
            onClose();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            alert('Failed to add new admin.');
        });
    };
   
    

    return (
        <div className={styles.overlay}>
            <div className={styles.formContainer}>
                <h2>Add Admin</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>email:</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label>store id:</label>
                        <select
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            required>
                                <option>Select a store</option>
                            {stores && stores.map((store) => (
                                <option key={store.id} >{store.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formActions}>
                        <button type="submit" className={styles.submitButton}>Add</button>
                        <button type="button" onClick={onClose} className={styles.cancelButton}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddAdminForm;
