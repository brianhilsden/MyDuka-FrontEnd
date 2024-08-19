import React, { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import myImage from "../../assets/images/[CITYPNG.COM]PNG Login Logout White Icon - 800x800.png";
import profileIcon from "../../assets/images/IMG_20240727_142324_284.jpg"; // Profile icon image
import { auth } from "../ChatBot";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../features/darkModeSlice";
import { showAddProduct } from "../../features/showAddProductSlice";
import { showAddStore } from "../../features/showAddStoreSlice";

const Sidebar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true); // Default to visible on larger screens
  const user = useSelector((state) => state.user.user);
  const darkMode = useSelector((state) => state.darkMode.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    localStorage.clear("access_token");
    auth.signOut();
    navigate("/");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode) {
      dispatch(switchMode(JSON.parse(savedMode)));
    }
  }, [dispatch]);

  const toggleDarkMode = () => {
    dispatch(switchMode());
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <>
      <button
        className={styles.toggleButton}
        onClick={toggleSidebar}
      >
        {isSidebarVisible ? "☰" : "X"}
      </button>
      <div
        className={`${styles.sidebar} ${isSidebarVisible ? styles.sidebarVisible : styles.sidebarHidden} ${darkMode ? styles.sidebarDark : ''}`}
      >
        <h2
          onClick={() => {
            if (user.role === "Merchant") {
              navigate("/merchant");
            } else if (user.role === "Clerk") {
              navigate(`/clerk/${user.id}`);
            } else {
              navigate(`/admin/${user.id}`);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          My Duka
        </h2>
        <div className={styles.profileSection}>
          <img
            src={user.profilePicture}
            alt="Profile Icon"
            className={styles.profileIcon}
            onClick={toggleProfile}
          />
          <span className={styles.profileName}>{user.username}</span>{" "}
        </div>
        <button
          className="add-product-btn"
          onClick={() => {
            if (user.role === "Merchant") {
              navigate("/merchant");
            } else if (user.role === "Clerk") {
              navigate(`/clerk/${user.id}`);
            } else {
              navigate(`/admin/${user.id}`);
            }
          }}
          style={{ cursor: "pointer" }}
        >
          Dashboard
        </button>
        <button
          className="add-product-btn"
          onClick={() => navigate("/chatBot")}
        >
          Messages
        </button>
        <button onClick={toggleDarkMode} className="add-product-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="navItem" style={{ gap: "1rem" }}>
          <img src={myImage} width={30} alt="logout" />{" "}
          <h2
            onClick={handleLogout}
            style={{
              cursor: "pointer",
              textDecoration: "none",
              marginTop: "0.8rem",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Log Out
          </h2>
        </div>
        {user.role === "Admin" && <button className="add-product-btn" onClick={() => dispatch(showAddProduct())}>
          <span className="plus-icon">+</span> Add Product
        </button>}
        {user.role === "Merchant" && <button className="add-product-btn" onClick={() => dispatch(showAddStore())}>
          <span className="plus-icon">+</span> Add Store
        </button>}
        {showProfile && <Profile onClose={toggleProfile} />} {/* Profile popup */}
      </div>
      <div className={`${styles.content} ${isSidebarVisible ? styles.contentWithSidebar : ''}`}>
        {/* Main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;
