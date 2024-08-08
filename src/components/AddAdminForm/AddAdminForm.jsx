import React, { useState } from 'react';
import styles from './AddAdminForm.module.css';

const AddAdminForm = ({ onClose }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Adding new admin: ${name}`);
        onClose();
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
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
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
