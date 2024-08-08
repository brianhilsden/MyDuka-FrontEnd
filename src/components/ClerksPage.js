import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPackage, clearCurrentPackage } from '../features/productSlice';
import { switchTruthValue } from '../features/truthValueSlice';
import AddPackageModal from './AddPackageModal';
import ConfirmPackageModal from './ConfirmPackageModal';
import SoldItemModal from './SoldItemModal';
import './ClerksPage.css';
import { useNavigate } from 'react-router-dom';


const ClerksPage = () => {
  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.product);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSoldItemModal, setShowSoldItemModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const truthValue = useSelector(state=>state.truthValue.truthValue)
  const store_id = user.store_id;

  useEffect(() => {
    fetch(`https://my-duka-back-end.vercel.app/getProducts/${store_id}`)
      .then(res => res.json())
      .then(data => setInventory(data));
  }, [truthValue,user, store_id]);
  console.log(truthValue);
  

  useEffect(() => {
    fetch(`https://my-duka-back-end.vercel.app/sales/${store_id}`)
      .then(res => res.json())
      .then(data => setSales(data.sales))
    
   
      
      
      
  }, [store_id,inventory,truthValue]);


  const handleRequestProduct = () => {
    setShowAddModal(true);
  };

  const handleAddPackage = (pkg) => {
    fetch("https://my-duka-back-end.vercel.app/requests/19",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        product_name:pkg.name,
        stock:parseInt(pkg.stock),
        product_price:pkg.price,
        clerk_id:user.id,
        category:pkg.category
      })
    }
      
    )
    .then(res=>res.json())
    .then(data=>console.log(data)
    )
    dispatch(setCurrentPackage(pkg));
    setShowAddModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmPackage = () => {
    dispatch(clearCurrentPackage());
    setShowConfirmModal(false);
  };

  const handleSellItem = () => {
    setShowSoldItemModal(true);
  };

  const handleAddSoldItem = (soldItem) => {
    console.log(soldItem);
    
 
      fetch("https://my-duka-back-end.vercel.app/sales/19",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          product_name:soldItem.productName,
          date:soldItem.date,
          quantity:parseInt(soldItem.quantity),
          total_price:soldItem.totalPrice
        })
      }
        
      )
      .then(res=>res.json())
     
      
    
  
    console.log('Sold item:', soldItem);
    //dispatch(addsoldItem(soldItem));
    setShowSoldItemModal(false);
    dispatch(switchTruthValue())
  };

  const handleLogout = () => {
    localStorage.clear("access_token");
    navigate("/");
  };
  const groupSalesByItem = (sales) => {
    return sales.reduce((groups, sale) => {
      const { product_name } = sale;
      if (!groups[product_name]) {
        groups[product_name] = [];
      }
      groups[product_name].push(sale);
      return groups;
    }, {});
  };

  const groupedSales = groupSalesByItem(sales);

  if (!user) {
    return (
      <h2>Kindly log in</h2>
    );
  }

  if (user) {
    return (
      <div className="clerks-page">
        <aside className="sidebar">
          <h2>My Duka</h2>
          <button onClick={handleLogout}>Log Out</button>
        </aside>
        <main className="main-content">
          <header>
            <h1>{user.username}</h1>
            <div>
              <button className="sell-btn" onClick={handleSellItem}>Sell Item</button>
              <button className="request-btn" onClick={handleRequestProduct}>Request Products</button>
            </div>
          </header>
          <section className="inventory">
            <h2>Inventory</h2>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Stocks</th>
                  <th>In stock</th>
                  <th>In units</th>
                  <th>Spoilt items</th>
                  <th>Unit Price</th>
                  <th>Sell Price</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td>{item.product_name}</td>
                    <td>{item.received_items}</td>
                    <td>{item.closing_stock}</td>
                    <td>kg</td>
                    <td>{item.spoilt_items}</td>
                    <td>{item.buying_price}</td>
                    <td>{item.selling_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="sales">
            <h2>Sales</h2>
            {Object.keys(groupedSales).map((itemName) => (
              <div key={itemName}>
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
                    {groupedSales[itemName].map(sale => (
                      <tr key={sale.id}>
                        <td>{new Date(sale.date).toLocaleDateString()}</td>
                        <td>{sale.product_name}</td>
                        <td>{sale.quantity_sold}</td>
                        <td>{sale.quantity_in_hand  }</td>
                        <td>{sale.profit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </section>
        </main>
        {showAddModal && (
          <AddPackageModal
            onClose={() => setShowAddModal(false)}
            onAddPackage={handleAddPackage}
          />
        )}
        {showConfirmModal && (
          <ConfirmPackageModal
            onClose={() => setShowConfirmModal(false)}
            onConfirmPackage={handleConfirmPackage}
          />
        )}
        {showSoldItemModal && (
          <SoldItemModal
            onClose={() => setShowSoldItemModal(false)}
            onAddSoldItem={handleAddSoldItem}
          />
        )}
      </div>
    );
  }
};

export default ClerksPage;
