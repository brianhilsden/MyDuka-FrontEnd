import React from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import myImage from "../../assets/images/[CITYPNG.COM]PNG Login Logout White Icon - 800x800.png"
import { auth } from '../ChatBot';


const Sidebar = () => {
    const navigate = useNavigate()
    
   
  const handleLogout = () =>{
    localStorage.clear("access_token")
    auth.signOut()
    navigate("/")
  }



    return (
        <div className={styles.sidebar}>
            <h2 style={{color:"white",cursor:"pointer"}} onClick={()=>navigate("/merchant")}>My Duka</h2>
            <nav style={{display:"flex",alignItems:"center"}}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <h2 onClick={()=>navigate("/chatBot")}>Messages</h2>

                    </li>
                    <li className={styles.navItem}>
                        <img src={myImage} width="40" alt='backgroundImage'/>
                        <h2 onClick={handleLogout} className='navLink'  style={{cursor:"pointer", textDecoration:"none"}} onMouseEnter={(e) => e.target.style.textDecoration = 'underline'} onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>Log Out</h2>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
