import React, { useState } from 'react';
import './SoldItemModal.css';

const SoldItemModal = ({ onClose, onAddSoldItem }) => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSoldItem({ productName, quantity, totalPrice, date });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sold Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalPrice">Total Price</label>
            <input
              type="number"
              id="totalPrice"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              placeholder="Enter Total Price"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-btn">ADD</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SoldItemModal;