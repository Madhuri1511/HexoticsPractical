import React, { useState, useEffect } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ProductForm = ({ open, handleClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    title: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        category: product.category || '',
        price: product.price || '',
        description: product.description || '',
      });
      setErrors({
        title: '',
        category: '',
        price: '',
        description: '',
      });
    } else {
      setFormData({
        title: '',
        category: '',
        price: '',
        description: '',
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let formErrors = {};
    if (!formData.title) formErrors.title = 'Title is required';
    if (!formData.category) formErrors.category = 'Category is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      formErrors.price = 'Valid price is required';
    }
    if (!formData.description) formErrors.description = 'Description is required';
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSave(formData); // Save the form data (add or update)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          margin="dense"
          label="Category"
          fullWidth
          name="category"
          value={formData.category}
          onChange={handleChange}
          error={!!errors.category}
          helperText={errors.category}
        />
        <TextField
          margin="dense"
          label="Price"
          type="number"
          fullWidth
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" >
       {product?.id?"Update":'Save'}
      
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductForm;
