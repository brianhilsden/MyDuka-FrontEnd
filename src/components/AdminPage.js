 // AdminPage.js
 import React, { useState, useEffect } from "react";
 import { useSelector, useDispatch } from "react-redux";
 import { useNavigate } from "react-router-dom";

 import {
 approveSupplyRequest,
 declineSupplyRequest,
 markProductAsPaid,
 addClerk,
 removeClerk,
 setSupplyRequests,
 setProducts,
 setClerks,
 setReports,
 } from "../features/adminSlice";
 import {
 LineChart,
 Line,
 XAxis,
 YAxis,
 CartesianGrid,
 Tooltip,
 Legend,
 BarChart,
 Bar,
 PieChart,
 Pie,
 } from "recharts";
 import "./AdminPage.css";

 const AdminPage = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate() 
 const [newClerkName, setNewClerkName] = useState("");
 const [newClerkEmail, setNewClerkEmail] = useState("");
 const [showAddClerkPopup, setShowAddClerkPopup] = useState(false);
 const [requests, setRequests] = useState([]);
 const [storeProducts, setStoreProducts] = useState([]);
 const [storeClerks, setStoreClerks] = useState([]);
 const [sales, setSales] = useState([]);
 const [refreshData, setRefreshData] = useState(false);

 const {
 supplyRequests = [],
 products = [],
 clerks = [],
 reports = {},
 } = useSelector((state) => state.admin);

 const groupSalesByProduct = (sales) => {
 return sales.reduce((groups, sale) => {
 const { product_name } = sale;

 if (!groups[product_name]) {
 groups[product_name] = [];
 }
 groups[product_name].push(sale);
 return groups;
 }, {});
 };

 const [groupedSalesProduct, setGroupedSalesProduct] = useState({}); // initialize state for grouped sales

 useEffect(() => {
 setGroupedSalesProduct(groupSalesByProduct(sales)); // update state
 dispatch(setReports(groupedSalesProduct)); // Ensure groupedSalesProduct is defined
 }, [sales]); // re-run effect when sales change


 useEffect(() => {
 // Fetch all required data

 const fetchSales = fetch(
 "https://my-duka-back-end.vercel.app/sales/3"
 ).then((res) => res.json());
 const fetchRequests = fetch(
 "https://my-duka-back-end.vercel.app/requests/3"
 ).then((res) => res.json());
 const fetchProducts = fetch(
 "https://my-duka-back-end.vercel.app/getProducts/3"
 ).then((res) => res.json());
 const fetchClerks = fetch(
 "https://my-duka-back-end.vercel.app/getClerk/3"
 ).then((res) => res.json());

 Promise.all([fetchSales, fetchRequests, fetchProducts, fetchClerks])
 .then(([salesData, requestsData, productsData, clerksData]) => {
 const sortedSales = salesData.sales.sort(
 (a, b) => new Date(a.date) - new Date(b.date)
 );
 // Set local state
 setSales(sortedSales);
 setRequests(requestsData);
 setStoreProducts(productsData);
 setStoreClerks(clerksData);

 // Dispatch actions after setting state
 dispatch(setSupplyRequests(requestsData));
 dispatch(setProducts(productsData));
 dispatch(setClerks(clerksData));

 dispatch(setReports(groupedSalesProduct)); // Ensure groupedSalesProduct is defined
 })
 .catch((error) => {
 console.error("Error fetching data:", error);
 });
 }, [refreshData]);
 console.log(groupedSalesProduct);
 
 
 
 const handleLogout = () =>{
 localStorage.clear("access_token")
 navigate("/")
 }
 

 const handleApproveRequest = (id) => {
 fetch(`https://my-duka-back-end.vercel.app/acceptRequests/${id}`)
 .then((res) => res.json())
 .then((data) => console.log(data))
 .then(()=> setRefreshData((prev) => !prev))
 
 dispatch(approveSupplyRequest(id));
 };

 const handleDeclineRequest = (id) => {
 fetch(`https://my-duka-back-end.vercel.app/acceptRequests/${id}`, {
 method: "DELETE",
 })
 .then((res) => res.json())
 .then((data) => console.log(data));
 
 dispatch(declineSupplyRequest(id));
 setRefreshData((prev) => !prev);
 };

 const handleMarkAsPaid = (id) => {
 fetch(`https://my-duka-back-end.vercel.app/paymentStatus/${id}`)
 .then((res) => res.json())
 .then((data) => console.log(data));

 dispatch(markProductAsPaid(id));
 };

 const handleAddClerk = () => {
 if (newClerkName.trim() && newClerkEmail.trim()) {
 dispatch(
 addClerk({
 id: Date.now(),
 name: newClerkName.trim(),
 email: newClerkEmail.trim(),
 status: "active",
 })
 );
 setNewClerkName("");
 setNewClerkEmail("");
 setShowAddClerkPopup(false);
 }
 };

 const handleRemoveClerk = async (id) => {
 try {
 const response = await fetch(
 `https://my-duka-back-end.vercel.app/clerkAccountStatus/${id}`,
 {
 method: "DELETE",
 headers: {
 "Content-Type": "application/json",
 },
 }
 );

 if (response.ok) {
 console.log(`Deleted clerk`);
 } else {
 console.error("Error deleting clerk:", response.statusText);
 }
 } catch (error) {
 console.error("Error deleting clerk:", error);
 }
 dispatch(removeClerk(id));
 };

 const handleInactivateClerk = async (id) => {
 try {
 fetch(
 `https://my-duka-back-end.vercel.app/clerkAccountStatus/${id}`
 ).then((response) => {
 if (response.ok) {
 console.log(`Inactivated clerk`);
 setRefreshData((prev) => !prev);
 // Optionally, you can trigger a refresh or update the state here
 return response.json();
 } else {
 console.error("Error inactivating clerk:", response.statusText);
 }
 });
 } catch (error) {
 console.error("Error inactivating clerk:", error);
 }

 console.log("Inactivate clerk", id);
 };

 const groupSalesByClerk = (sales) => {
 return sales.reduce((groups, sale) => {
 const { username } = sale.clerk;

 if (!groups[username]) {
 groups[username] = [];
 }
 groups[username].push(sale);
 return groups;
 }, {});
 };

 const groupedSales = groupSalesByClerk(sales);

 const calculateTotals = (data) => {
 return Object.keys(data).map((product) => {
 const totalQuantitySold = data[product].reduce(
 (sum, record) => sum + record.quantity_sold,
 0
 );
 const totalProfit = data[product].reduce(
 (sum, record) => sum + record.profit,
 0
 );
 return {
 name: product.charAt(0).toUpperCase() + product.slice(1), // Capitalizes the product name
 quantitySold: totalQuantitySold,
 profit: totalProfit,
 };
 });
 };

 const result = calculateTotals(groupedSalesProduct);

 const colors = [
 "#8884d8", // Light Purple
 "#82ca9d", // Light Green
 "#ffc658", // Light Orange
 "#a4de6c", // Light Lime
 "#d0ed57", // Light Yellow
 "#8dd1e1", // Light Blue
 "#83a6ed", // Medium Blue
 "#d074cb", // Light Pink
 "#8884d8", // Medium Purple
 "#ff8042", // Orange
 "#ffbb28", // Yellow
 "#00C49F", // Teal
 "#FF8042", // Dark Orange
 "#FFBB28", // Yellow-Orange
 "#FF7F50", // Coral
 "#FF4500", // Orange-Red
 "#FFD700", // Gold
 "#9ACD32", // Yellow-Green
 "#32CD32", // Lime Green
 "#6495ED", // Cornflower Blue
 ];

 const calculateClerkSales = (data) => {
 if (data[0]) {
 return data.map((clerk, index) => {
 const totalQuantitySold = clerk.salesReports.reduce(
 (sum, report) => sum + report.quantity_sold,
 0
 );
 return {
 name: clerk.username,
 value: totalQuantitySold,
 fill: colors[index] || "#000000", // Assign color from the array or default to black
 };
 });
 }
 };

 const clerkSalesData = calculateClerkSales(clerks);

 return (
 <div className="admin-page">
 <aside className="sidebar">
 <h2>My Duka</h2>
 <button className="logout-btn" onClick={handleLogout}>Log Out</button>
 </aside>
 <main className="main-content">
 <header>
 <h1>Admin</h1>
 <button
 className="add-clerk-btn"
 onClick={() => setShowAddClerkPopup(true)}
 >
 <span className="plus-icon">+</span> Add Clerk
 </button>
 </header>

 <section className="supply-requests">
 <h2>Supply Requests</h2>
 <table>
 <thead>
 <tr>
 <th>Clerk</th>
 <th>Product</th>
 <th>Quantity</th>
 <th>Status</th>
 <th>Actions</th>
 </tr>
 </thead>
 {supplyRequests[0] && (
 <tbody>
 {supplyRequests.map((request) => (
 <tr key={request.id}>
 <td>{request.clerk.username}</td>
 <td>{request.product.product_name}</td>
 <td>{request.quantity}</td>
 <td>{request.status}</td>

 <td>
 {request.status == "Pending" && (
 <button
 className="approve-btn"
 onClick={() => handleApproveRequest(request.id)}
 >
 Approve
 </button>
 )}
 {request.status == "Pending" && (
 <button
 className="decline-btn"
 onClick={() => handleDeclineRequest(request.id)}
 >
 Decline
 </button>
 )}
 </td>
 </tr>
 ))}
 </tbody>
 )}
 </table>
 </section>

 <section className="products">
 <h2>Products</h2>
 <table>
 <thead>
 <tr>
 <th>Item</th>
 <th>Paid Status</th>
 <th>Spoilt</th>
 <th>Remaining Stock</th>
 <th>Unit Price</th>
 <th>Buying Price</th>
 </tr>
 </thead>
 <tbody>
 {products.map((product) => (
 <tr key={product.id}>
 <td>{product.product_name}</td>
 <td>
 {product.payment_status === "paid" ? (
 "Paid"
 ) : (
 <button onClick={() => handleMarkAsPaid(product.id)}>
 Mark as Paid
 </button>
 )}
 </td>
 <td>{product.spoilt_items}</td>
 <td>{product.closing_stock}</td>
 <td>{product.selling_price}</td>
 <td>{product.buying_price}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </section>

 <section className="clerks">
 <h2>Clerks</h2>
 <table>
 <thead>
 <tr>
 <th>Name</th>
 <th>Email</th>
 <th>Status</th>
 <th>Actions</th>
 </tr>
 </thead>
 <tbody>
 {clerks.map((clerk) => (
 <tr key={clerk.id}>
 <td>{clerk.username}</td>
 <td>{clerk.email}</td>
 <td>{clerk.account_status}</td>
 <td>
 <button
 className="inactivate-btn"
 onClick={() => handleInactivateClerk(clerk.id)}
 >
 {clerk.account_status}
 </button>
 <button
 className="delete-btn"
 onClick={() => handleRemoveClerk(clerk.id)}
 >
 Delete
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </section>

 {Object.keys(groupedSales).map((itemName) => (
 <section key={itemName} className="clerk-sales">
 <h3>{itemName}</h3>
 <table>
 <thead>
 <tr>
 <th>DATE</th>
 <th>ITEM</th>
 <th>QUANTITY SOLD</th>
 <th>QUANTITY UNSOLD</th>
 <th>PROFIT</th>
 </tr>
 </thead>
 <tbody>
 {groupedSales[itemName].map((sale) => (
 <tr key={sale.id}>
 <td>{new Date(sale.date).toLocaleDateString()}</td>
 <td>{sale.product_name}</td>
 <td>{sale.quantity_sold}</td>
 <td>{sale.quantity_in_hand}</td>
 <td>{sale.profit}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </section>
 ))}

 <section className="performance-reports">
 <h2>Performance Reports</h2>
 {Object.entries(reports).map(([product, data]) => (
 <div key={product} className="product-report">
 <h3>
 {product.charAt(0).toUpperCase() + product.slice(1)} Sales
 Trends
 </h3>
 <LineChart width={600} height={300} data={data}>
 <XAxis dataKey="date" />
 <YAxis yAxisId="left" />
 <YAxis yAxisId="right" orientation="right" />
 <CartesianGrid strokeDasharray="3 3" />
 <Tooltip />
 <Legend />
 <Line
 yAxisId="left"
 type="monotone"
 dataKey="quantity_sold"
 stroke="#ffc658"
 name="Quantity Sold"
 />
 <Line
 yAxisId="left"
 type="monotone"
 dataKey="quantity_in_hand"
 stroke="#ff0000"
 name="Quantity in Hand"
 />
 <Line
 yAxisId="right"
 type="monotone"
 dataKey="profit"
 stroke="#82ca9d"
 name="Profit (KSH)"
 />
 </LineChart>
 </div>
 ))}
 </section>
 <section className="product-performance-comparison">
 <h2>Product Performance Comparison</h2>
 <BarChart width={800} height={400} data={result}>
 <XAxis dataKey="name" />
 <YAxis yAxisId="left" />
 <YAxis yAxisId="right" orientation="right" />
 <CartesianGrid strokeDasharray="3 3" />
 <Tooltip />
 <Legend />
 <Bar
 yAxisId="left"
 dataKey="quantitySold"
 fill="#8884d8"
 name="Quantity Sold"
 />
 <Bar
 yAxisId="right"
 dataKey="profit"
 fill="#82ca9d"
 name="Profit (KSH)"
 />
 </BarChart>
 </section>
 <section className="clerk-performance-comparison">
 <h2>Clerk Performance Comparison</h2>
 <PieChart width={800} height={400}>
 <Pie
 data={clerkSalesData}
 dataKey="value"
 nameKey="name"
 cx="50%"
 cy="50%"
 outerRadius={120}
 label
 />
 <Tooltip />
 <Legend />
 </PieChart>
 </section>
 </main>

 {showAddClerkPopup && (
 <div className="popup">
 <div className="popup-content">
 <h2>Add New Clerk</h2>
 <input
 type="text"
 value={newClerkName}
 onChange={(e) => setNewClerkName(e.target.value)}
 placeholder="Enter clerk name"
 />
 <input
 type="email"
 value={newClerkEmail}
 onChange={(e) => setNewClerkEmail(e.target.value)}
 placeholder="Enter clerk email"
 />
 <button onClick={handleAddClerk}>Add</button>
 <button onClick={() => setShowAddClerkPopup(false)}>Cancel</button>
 </div>
 </div>
 )}
 </div>
 );
 };

 export default AdminPage;