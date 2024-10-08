import React, { useState, useEffect } from "react";
import AdminItem from "../AdminItem/AdminItem";
import Sidebar from "../Sidebar/Sidebar";
import AddAdminForm from "../AddAdminForm/AddAdminForm";
import styles from "./MerchantDashboard.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { showAddStore } from "../../features/showAddStoreSlice";

const MerchantDashboard = () => {
  const [admins, setAdmins] = useState([]);
  const user = useSelector((state) => state.user.user);
  const [stores, setStores] = useState([]);
  const showStore = useSelector((state) => state.showAddStore.mode);
  const darkMode = useSelector((state)=>state.darkMode.mode)
  const dispatch = useDispatch();

  const removeAdmin = (id) => {
    setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
  };

  useEffect(() => {
    fetch("https://my-duka-back-end.vercel.app/getAdmins")
      .then((response) => response.json())
      .then((data) => setAdmins(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    fetch("https://my-duka-back-end.vercel.app/stores")
      .then((res) => res.json())
      .then((data) => setStores(data))
      .catch((error) => console.error(error));
    // eslint-disable-next-line
  }, [admins, user]);

  const [isAddAdminFormVisible, setIsAddAdminFormVisible] = useState(false);

  const toggleAddAdminForm = () => {
    setIsAddAdminFormVisible(!isAddAdminFormVisible);
  };

  const [newStore, setNewStore] = useState({
    name: "",
    location: "",
  });

  const handleAddStoreChange = (e) => {
    const { name, value } = e.target;
    setNewStore((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStoreSubmit = () => {
    // Implementation for adding the product
    fetch(`https://my-duka-back-end.vercel.app/addStore`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newStore),
    }).then((res) => res.json());

    // Reset form and close popup
    setNewStore({
      name: "",
      location: "",
    });
    dispatch(showAddStore(false));
  };

  const storeSales = stores.map((store) => {
    const totalSales = store.salesReports.reduce(
      (acc, report) => acc + report.quantity_sold,
      0
    );
    return {
      storeName: store.name,
      sales: totalSales,
    };
  });

  if (user.role === "Merchant") {
    return (
        <div className={`admin-page ${darkMode ? 'dark-mode' : ''}`}>
        <Sidebar /> {/* Sidebar with profile icon */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1>Merchant Dashboard - {user.username}</h1>
            <button onClick={toggleAddAdminForm} className={styles.addButton} style={{ marginTop:"10px"}}>
              Add Admin
            </button>
          </div>
          {admins.map((admin) => (
            <AdminItem key={admin.id} admin={admin} removeAdmin={removeAdmin} />
          ))}
          <div className={styles.sales}>
            <h3>Top 3 Stores by Sales</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={storeSales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="storeName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {isAddAdminFormVisible && (
            <AddAdminForm onClose={toggleAddAdminForm} />
          )}
        </div>
        {showStore && (
          <div className="popup">
            <div className="popup-content">
              <h2>Add New Store</h2>
              <input
                type="text"
                name="name"
                value={newStore.name}
                placeholder="Store Name"
                onChange={handleAddStoreChange}
              />
              <input
                type="text"
                name="location"
                value={newStore.location}
                placeholder="Store Location"
                onChange={handleAddStoreChange}
              />

              <button onClick={handleAddStoreSubmit}>Add</button>
              <button onClick={() => dispatch(showAddStore(false))}>
                Cancel
              </button>
            </div>
          </div>
        )}

        
      </div>
    );
  }
  return null;
};

export default MerchantDashboard;
