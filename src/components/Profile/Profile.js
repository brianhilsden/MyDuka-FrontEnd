import React, { useState } from 'react';
import styles from './Profile.module.css';
import { useSelector,useDispatch } from 'react-redux';

import { addUser } from '../../features/userSlice';

const Profile = ({ onClose }) => {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();
    
    
    const [userDetails, setUserDetails] = useState({
     
        username: user.username,
        email: user.email,
        phone_number: user.phone_number,
        profilePicture:user.profilePicture
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
        console.log(userDetails);
        
       
        fetch(`https://my-duka-back-end.vercel.app/editUser/${user.id}`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...userDetails,role:user.role})
            }
        ).then(res=>res.json()).then((data)=>{
            console.log(data);
            
            dispatch(addUser(data))
        }

        )
        onClose();
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
                
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
                        name="phone_number"
                        value={userDetails.phone_number}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Profile picture:
                    <input
                        type="text"
                        name="profilePicture"
                        value={userDetails.profilePicture}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button onClick={handleSave} className={styles.saveButton}>Save</button>
        </div>
    );
};

export default Profile;

