import React from 'react';
import { useSelector } from 'react-redux';
import './ConfirmPackageModal.css';

const ConfirmPackageModal = ({ onClose, onConfirmPackage }) => {
  const currentPackage = useSelector((state) => state.product.currentPackage);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Confirmation & Submit</h2>
        <p>Product Name: {currentPackage.name}</p>
        <p>Product Brand Name: {currentPackage.brand_name}</p>
        <p>Unit Pricing: {currentPackage.price}</p>
        <p>Stock: {currentPackage.stock}</p>
        <button onClick={onConfirmPackage}>Submit</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmPackageModal;