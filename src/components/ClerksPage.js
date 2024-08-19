import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPackage, clearCurrentPackage } from '../features/productSlice';
import { switchTruthValue } from '../features/truthValueSlice';
import AddPackageModal from './AddPackageModal';
import ConfirmPackageModal from './ConfirmPackageModal';
import SoldItemModal from './SoldItemModal';
import './ClerksPage.css';
import { useNavigate } from 'react-router-dom';
import myImage from "../assets/images/[CITYPNG.COM]PNG Login Logout White Icon - 800x800.png"
import Sidebar from './Sidebar/Sidebar';


const ClerksPage = () => {
  const [inventory, setInventory] = useState([]);
  const [sales, setSales] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedSpoiltItems, setEditedSpoiltItems] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSoldItemModal, setShowSoldItemModal] = useState(false);
  const user = useSelector(state => state.user.user);
  const truthValue = useSelector(state=>state.truthValue.truthValue)
  const currentPackage = useSelector(state=>state.product.currentPackage)
 
  const darkMode = useSelector((state)=>state.darkMode.mode)
  const store_id = user.store_id;

  useEffect(() => {
    fetch(`https://my-duka-back-end.vercel.app/getProducts/${store_id}`)
      .then(res => res.json())
      .then(data => setInventory(data));
  }, [truthValue,user, store_id,sales]);



  useEffect(() => {
    fetch(`https://my-duka-back-end.vercel.app/sales/${store_id}`)
      .then(res => res.json())
      .then(data => setSales(data.sales.filter(sale => sale.clerk_id === user.id)))


    
  }, [store_id,inventory,truthValue]);


  const handleRequestProduct = () => {
    setShowAddModal(true);
  };

  const handleAddPackage = (pkg) => {

    dispatch(setCurrentPackage(pkg));
    setShowAddModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmPackage = () => {
 ;

    fetch(`http://127.0.0.1:5555/requests/${store_id}`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        product_name:currentPackage.name,
        stock:parseInt(currentPackage.stock),
        product_price:currentPackage.price,
        brand_name:currentPackage.brand_name,
        clerk_id:user.id,
        category:currentPackage.category
      })
    }

    )
    .then(res=>res.json())
  
    
    dispatch(clearCurrentPackage());
    setShowConfirmModal(false);
  };

  const handleSellItem = () => {
    setShowSoldItemModal(true);
  };

  const handleAddSoldItem = (soldItem) => {

      fetch(`https://my-duka-back-end.vercel.app/sales/${store_id}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          product_name:soldItem.productName,
          date:soldItem.date,
          quantity:parseInt(soldItem.quantity),
          clerk_id : user.id
        })
      }

      )
      .then(res=>res.json())




    console.log('Sold item:', soldItem);
    //dispatch(addsoldItem(soldItem));
    setShowSoldItemModal(false);
    dispatch(switchTruthValue())
  };

  const handleSpoiltItemsChange = (itemId, newSpoiltItems) => {
    setInventory(prevInventory =>
      prevInventory.map(item =>
        item.id === itemId ? { ...item, spoilt_items: newSpoiltItems } : item
      )
    );
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

  const handleEditClick = (itemId, spoiltItems) => {
    setEditingItemId(itemId);
    setEditedSpoiltItems(spoiltItems);
  };

  const handleSaveClick = (itemId) => {
    handleSpoiltItemsChange(itemId, editedSpoiltItems);

    setEditingItemId(null);
  
     
      fetch(`https://my-duka-back-end.vercel.app/updateProduct/${itemId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spoilt_items: editedSpoiltItems,
        
        }),
      })
        .then((res) => res.json())
        .then(() => {
          setEditingItemId(null);
        });
  
  
  };

  if (user.role === "Clerk") {
    return (
      <div className={`admin-page ${darkMode ? 'dark-mode' : ''}`}>
   
        <Sidebar/>
        <main className="main-content">
          <header>
            <h1 style={{marginLeft:"1rem"}}>{user.username}</h1>
            <div>
              <button className="sell-btn" onClick={handleSellItem}>Sell Item</button>
              <button className="request-btn" onClick={handleRequestProduct}>Request Products</button>
            </div>
          </header>
          <section className="inventory">
            <h2>Inventory</h2>
            <div className="table-responsive"> 
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Payment status</th>
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
                    <td>{item.payment_status}</td>
                    <td>{item.closing_stock}</td>
                    <td>kg</td>
                    <td style={{display:"flex",gap:"1rem"}}>
                      {editingItemId === item.id ? (
                        <div  >
                          <input
                            type="number"
                            value={editedSpoiltItems}
                            onChange={e => setEditedSpoiltItems(parseInt(e.target.value))}
                            style={{width:"50%"}}
                          />
                          <button onClick={() => handleSaveClick(item.id)}>Save</button>
                        </div>
                      ) : (
                        <>
                          {item.spoilt_items}
                          <button onClick={() => handleEditClick(item.id, item.spoilt_items)}>Edit</button>
                        </>
                      )}
                    </td>
                    <td>{item.buying_price}</td>
                    <td>{item.selling_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </section>
          <section className="sales">
            <h2>Sales</h2>
            {Object.keys(groupedSales).map((itemName) => (
              <div key={itemName}>
                <h3>{itemName}</h3>
                <div className="table-responsive"> 
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