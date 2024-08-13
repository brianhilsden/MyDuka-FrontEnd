import React, { useState } from 'react';
import './AddPackageModal.css';


const AddPackageModal = ({ onClose, onAddPackage }) => {

  const [formData, setFormData] = useState({
    name: '',
    brand_name: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPackage(formData);
    
   
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Package</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="brand_name"
            placeholder="Product Brand Name"
            value={formData.brand_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="price"
            placeholder="Product Price"
            value={formData.price}
            onChange={handleChange}
          />
          <input
            type="text"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
          />
          <button type="submit">Continue</button>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddPackageModal;