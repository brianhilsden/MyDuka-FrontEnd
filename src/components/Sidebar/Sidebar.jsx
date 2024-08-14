import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import myImage from "../../assets/images/[CITYPNG.COM]PNG Login Logout White Icon - 800x800.png"

const Sidebar = () => {
    const navigate = useNavigate()
   
  const handleLogout = () =>{
    localStorage.clear("access_token")
    navigate("/")
  }

    return (
        <div className={styles.sidebar}>
            <h2 style={{color:"white"}}>My Duka</h2>
            <nav style={{display:"flex",alignItems:"center"}}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <img src={myImage} width="40"/>
                        <h2 onClick={handleLogout} className={styles.navLink} style={{cursor:"pointer", textDecoration:"none"}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Log Out</h2>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
