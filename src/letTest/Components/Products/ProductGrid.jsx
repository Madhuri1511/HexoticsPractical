import Box from '@mui/material/Box';
import { DataGrid,GridToolbarQuickFilter   } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm'; // Import the ProductForm component
import { Button } from '@mui/material';
import Swal from 'sweetalert2'; 

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false); // Modal visibility state
  const [selectedProduct, setSelectedProduct] = useState(null); // Product being edited or null for new product
  const [categories, setCategories] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('');
  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      width: 110,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 800,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <button
            className=" MainPageColor hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded"
            onClick={() => deletedata(params.row.id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  const getAllProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const result = await response.json();
    setProducts(result);
  };
// Fetch categories from the API
const getCategories = async () => {
    const response = await fetch('https://fakestoreapi.com/products/categories');
    const result = await response.json();
    setCategories(result);
  };
  // Fetch products by category
  const getProductsByCategory = async (category) => {
    const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    const result = await response.json();
    setProducts(result);
  };
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);

    if (category === '') {
      // If "All Categories" is selected, fetch all products
      getAllProducts();
    } else {
      // Fetch products for the selected category
      getProductsByCategory(category);
    }
  };
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setOpen(true); // Open the modal for editing
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };
  function QuickSearchToolbar() {
    return (
      <Box
        sx={{
          p: 0.5,
          pb: 0,
        }}
      >
        <GridToolbarQuickFilter />
        <Button
          variant="contained"
          className='MainPageColor text-white'
          style={{float: 'right',backgroundColor:'#001d5d'}}
          onClick={() => setOpen(true)} // Open the modal for creating a new product
        >
          Add New Product
        </Button>
       
        
        <label htmlFor="category-select" style={{ marginRight: '10px' }}>
          Category:
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select a category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        
     


      </Box>
    );
  }

  const handleSave = async (productData) => {
    if (selectedProduct) {
      // Update existing product
      const response = await fetch(`https://fakestoreapi.com/products/${selectedProduct.id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updatedProduct = await response.json();
        console.log('Product updated:', updatedProduct);
        getAllProducts(); // Refresh product list
        handleClose(); // Close the modal
      } else {
        console.error('Failed to update product');
      }
    } else {
      // Create new product
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newProduct = await response.json();
        console.log('New product created:', newProduct);
        getAllProducts(); // Refresh product list
        handleClose(); // Close the modal
      } else {
        console.error('Failed to create product');
      }
    }
  };

//   const deletedata = async (id) => {
//     const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       console.log('Product deleted');
//       getAllProducts(); // Refresh product list
//     } else {
//       console.error('Failed to delete product');
//     }
//   };

const deletedata = async (id) => {
    // SweetAlert confirmation for deletion
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#001d5d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
            console.log("delted",response)
          Swal.fire('Deleted!', 'The product has been deleted.', 'success');
          getAllProducts(); // Refresh product list
        } else {
          Swal.fire('Error!', 'Failed to delete the product.', 'error');
        }
      }
    });
  };
  useEffect(() => {
    getAllProducts();
    getCategories();  
  }, []);

  return (
    <>
      {/* Add New Product Button */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)} // Open the modal for creating a new product
        >
          Add New Product
        </Button>
      </Box> */}

      {/* DataGrid */}
      <Box 
       sx={{
        height: 600, // Height of the DataGrid
        width: '100%',
        '& .MuiDataGrid-columnHeaders': {
            width:'100%',
          backgroundColor: '#23283c', // Fixed header background color
          color: 'white',
        },
        '& .MuiDataGrid-cell': {
          fontSize: '14px',
          color: '#1d5978', // Cell text color
        },
        '& .MuiDataGrid-columnHeader': {
           
          backgroundColor: '#23283c', // Column header background color
          color: 'white',
        },
        '& .MuiDataGrid-viewport': {
          overflowY: 'auto', // Enable scrolling only on the viewport (body of DataGrid)
        },
        '& .MuiDataGrid-footerContainer': {
        //   backgroundColor: '#23283c', // Footer background color
        //   color: 'white',
        },
        '& .MuiToolbar-root': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        },
        '& .MuiToolbar-root p': {
          marginBottom: '0px',
        },
        '& .css-16c50h-MuiInputBase-root-MuiTablePagination-select': {
          marginRight: '0px',
          marginLeft: '0px',
          border: '1px solid rgb(138, 138, 138)',
        },
        '& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar .MuiTablePagination-actions': {
          marginLeft: '0px',
        },
        '& .MuiIconButton-root': {
          color: 'white',
        },
    }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          density="compact"
          style={{ border: 'none' }}
          slots={{ toolbar: QuickSearchToolbar }}
          slotProps={{ toolbar: { showQuickFilter: true } }}
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableColumnFilter
          disableRowSelectionOnClick
        />
      </Box>

      {/* ProductForm Modal */}
      <ProductForm
        open={open}
        handleClose={handleClose}
        product={selectedProduct}
        onSave={handleSave}
      />
    </>
  );
};

export default ProductGrid;
