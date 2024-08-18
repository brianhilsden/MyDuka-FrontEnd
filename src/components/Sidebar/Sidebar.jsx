import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import myImage from "../../assets/images/[CITYPNG.COM]PNG Login Logout White Icon - 800x800.png";
import profileIcon from "../../assets/images/IMG_20240727_142324_284.jpg"; // Profile icon image
import Profile from '../Profile/Profile';

const Sidebar = () => {
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        localStorage.clear("access_token");
        navigate("/");
    };

    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };

    return (
        <div className={styles.sidebar}>
            <h2 style={{ color: "white" }}>My Duka</h2>
            <div className={styles.profileSection}>
                <img src={profileIcon} alt="Profile Icon" className={styles.profileIcon} onClick={toggleProfile} />
                <span className={styles.profileName}>ryan maiyo</span> {/* Replace with dynamic user data if available */}
            </div>
            <nav style={{ display: "flex", alignItems: "center" }}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <img src={myImage} alt="Logout Icon" width="40" />
                        <h2 
                            onClick={handleLogout} 
                            className={styles.navLink} 
                            style={{ cursor: "pointer", textDecoration: "none" }} 
                            onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} 
                            onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                        >
                            Log Out
                        </h2>
                    </li>
                </ul>
            </nav>
            {showProfile && <Profile onClose={toggleProfile} />} {/* Profile popup */}
        </div>
    );
};

export default Sidebar;
