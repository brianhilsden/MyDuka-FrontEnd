import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Clear any authentication tokens or user data from local storage/session storage
                localStorage.removeItem('authToken');
                window.location.href = '/login'; // Redirect to login page
            } else {
                console.error('Error logging out:', response.statusText);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className={styles.sidebar}>
            <h2>My Duka</h2>
            <nav>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <button onClick={handleLogout} className={styles.navLink}>Log Out</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
