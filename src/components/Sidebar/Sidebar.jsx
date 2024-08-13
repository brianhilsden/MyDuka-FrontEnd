import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate()
   
  const handleLogout = () =>{
    localStorage.clear("access_token")
    navigate("/")
  }

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
