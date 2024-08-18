import React, { useState } from 'react';
import styles from './Profile.module.css';

const Profile = ({ onClose }) => {
    const [userDetails, setUserDetails] = useState({
        name: 'Ryan Maiyo',
        username: "ryan",
        email: 'ryan@gmail.com',
        phone: '+254 725 45523',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Save the updated details
        console.log('Saved details:', userDetails);
        onClose();
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                <h2>I'm {userDetails.name}</h2>
                <button onClick={onClose} className={styles.closeButton}>X</button>
            </div>
            <div className={styles.profileDetails}>
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        value={userDetails.username}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={userDetails.email}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="text"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
        </div>
    );
};

export default Profile;

