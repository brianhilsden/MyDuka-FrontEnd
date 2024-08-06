
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPackage, clearCurrentPackage } from '../features/productSlice';
import AddPackageModal from './AddPackageModal';
import ConfirmPackageModal from './ConfirmPackageModal';
import SoldItemModal from './SoldItemModal';
import './ClerksPage.css';

const ClerksPage = () => {
  const dispatch = useDispatch();
  const { packages } = useSelector((state) => state.product);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSoldItemModal, setShowSoldItemModal] = useState(false);

  const handleRequestProduct = () => {
    setShowAddModal(true);
  };

  const handleAddPackage = (pkg) => {
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
    console.log('Sold item:', soldItem);
    // Dispatch an action to update the Redux store
    dispatch(addSoldItem(soldItem));
    setShowSoldItemModal(false);
  };
  

  return (
    <div className="clerks-page">
      <aside className="sidebar">
        <h2>My Duka</h2>
        <button>Log Out</button>
      </aside>
      <main className="main-content">
        <header>
          <h1>Grace</h1>
        
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
                <th>in stock</th>
                <th>Unit Price</th>
                <th>Sell Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Rice</td>
                <td>0</td>
                <td>30</td>
                <td>kg</td>
                <td>30</td>
                <td>Ksh 121/kg</td>
                <td>Ksh 150/kg</td>
              </tr>
              <tr>
                <td>Beans</td>
                <td>45</td>
                <td>45</td>
                <td>kg</td>
                <td>45</td>
                <td>Ksh 193/kg</td>
                <td>Ksh 180/kg</td>
              </tr>
              <tr>
                <td>Greengrams</td>
                <td>43</td>
                <td>10</td>
                <td>kg</td>
                <td>43</td>
                <td>Ksh 121/kg</td>
                <td>Ksh 120/kg</td>
              </tr>
            </tbody>
          </table>
        </section>
        <section className="sales">
          <h2>Sales</h2>
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
              <tr>
                <td>24th July 2023</td>
                <td>rice</td>
                <td>10</td>
                <td>13</td>
                <td>1300</td>
              </tr>
              <tr>
                <td>7th may 2024</td>
                <td>rice</td>
                <td>6</td>
                <td>7</td>
                <td>7400</td>
              </tr>
              <tr>
                <td>10 june 2024</td>
                <td>rice</td>
                <td>4</td>
                <td>2</td>
                <td>6500</td>
              </tr>
            </tbody>
          </table>
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
              <tr>
                <td>7th jan 2023</td>
                <td>beans</td>
                <td>9</td>
                <td>31</td>
                <td>14170</td>
              </tr>
              <tr>
                <td>30th may 2023</td>
                <td>beans</td>
                <td>7</td>
                <td>13</td>
                <td>10080</td>
              </tr>
              <tr>
                <td>8th feb 2024</td>
                <td>beans</td>
                <td>11</td>
                <td>13</td>
                <td>17270</td>
              </tr>
            </tbody>
          </table>
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
              <tr>
                <td>10th may 2023</td>
                <td>greengrams</td>
                <td>7</td>
                <td>16</td>
                <td>3400</td>
              </tr>
              <tr>
                <td>13th oct 2023</td>
                <td>greengrams</td>
                <td>8</td>
                <td>8</td>
                <td>4000</td>
              </tr>
              <tr>
                <td>15th may 2024</td>
                <td>greengrams</td>
                <td>5</td>
                <td>3</td>
                <td>2900</td>
              </tr>
            </tbody>
          </table>
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
};

export default ClerksPage;