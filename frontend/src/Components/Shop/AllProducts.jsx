import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import Close icon
import { toast } from "react-toastify";
import {
  getAllShopProducts,
  deleteShopProduct,
  updateProduct,
} from "../../Redux/actions/product";
import Loader from "../Layout/Loader";
import DataTable from "react-data-table-component";

const AllProducts = () => {
  const { id } = useParams(); // Product ID from URL
  const { products, isLoading, message, error } = useSelector(
    (state) => state.products
  );
  const { seller } = useSelector((state) => state.seller);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    tags: "",
    originalPrice: "",
    discountPrice: "",
    stock: "",
  });
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopProducts(seller._id));
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  useEffect(() => {
    setFilteredProducts(
      products?.filter((product) => {
        const name = product.name?.toLowerCase() || "";
        const price = product.originalPrice?.toString() || "";
        const category = product.category?.toLowerCase() || "";
        const discountPrice = product.discountPrice?.toString() || "";
        const stock = product.stock?.toString() || "";
        const sold = product.sold_out?.toString() || "";
        const productDate = new Date(product.createdAt)
          .toLocaleDateString()
          .toLowerCase();

        return (
          name.includes(searchQuery.toLowerCase()) ||
          category.includes(searchQuery.toLowerCase()) ||
          price.includes(searchQuery) ||
          discountPrice.includes(searchQuery) ||
          stock.includes(searchQuery) ||
          sold.includes(searchQuery) ||
          productDate.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [products, searchQuery]);

  const handleDelete = (id) => {
    // dispatch(deleteShopProduct(id));
    dispatch(deleteShopProduct(id)).then(() => {
      dispatch(getAllShopProducts(seller._id));
    });
  };

  const handleEdit = (product) => {
    console.log(product);
    setSelectedProductId(product.id);
    setFormData({
      name: product.name || "",
      category: product.category || "",
      description: product.description || "",
      tags: product.tags || "",
      originalPrice: product.price.replace(" ₹", "") || "", // Remove currency symbol for number input
      discountPrice: product.discountPrice.replace(" ₹", "") || "",
      stock: product.stock || "",
    });
    setOpen(true); // Open the dialog
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedProductId(null);
    setFormData({
      name: "",
      category: "",
      description: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    for (const key in formData) {
      updatedData.append(key, formData[key]);
    }

    dispatch(updateProduct(selectedProductId, updatedData)).then(() => {
      dispatch(getAllShopProducts(seller._id));
      handleDialogClose();
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      minWidth: "90px",
      width: "90px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Discount",
      selector: (row) => row.discountPrice,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Description",
      selector: (row) =>
        row.description ? row.description.substring(0, 30) + "..." : "",
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Tags",
      selector: (row) => row.tags,
      sortable: true,
      minWidth: "80px",
      width: "80px",
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      minWidth: "80px",
      width: "80px",
    },
    {
      name: "Sold out",
      selector: (row) => row.sold,
      sortable: true,
      minWidth: "85px",
      width: "85px",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "110px",
      width: "110px",
    },
    {
      name: "Preview",
      cell: (row) => (
        <Link to={`/product/${row.id}`}>
          <Button>
            <AiOutlineEye size={20} />
          </Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "50px",
      width: "50px",
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button onClick={() => handleDelete(row.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "50px",
      width: "50px",
    },
    {
      name: "Edit",
      cell: (row) => (
        <Button onClick={() => handleEdit(row)}>
          <AiOutlineEdit size={20} color="#3f51b5" />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "50px",
      width: "50px",
    },
  ];

  const data = filteredProducts?.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.originalPrice + " ₹",
    discountPrice: item.discountPrice + " ₹",
    description: item.description,
    tags: item.tags,
    category: item.category,
    stock: item.stock,
    sold: item.sold_out,
    createdAt: item.createdAt,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white ml-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[22px] font-Roboto pb-2">All Products</h3>
            <input
              type="text"
              placeholder="Search..."
              className={`mb-4 p-2 border rounded-md transition-colors duration-300 ${
                searchQuery
                  ? "border-blue-400" // Border color when searchQuery is not empty
                  : "border-gray-500" // Default border color
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* <div className="w-[95%] overflow-x-auto"> */}
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            customStyles={customStyles}
            responsive={true} // Ensure responsive behavior
            fixedHeader
          />
          {/* </div> */}
          {/* Edit Product Dialog */}
          <Dialog open={open} onClose={handleDialogClose}>
            <DialogTitle>
              Edit Product
              <IconButton
                aria-label="close"
                onClick={handleDialogClose}
                style={{ position: "absolute", right: 8, top: 8 }}
              >
                <AiOutlineClose />
              </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <DialogContent>
                <div className="grid grid-cols-2 gap-6">
                  <TextField
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                  />
                  <TextField
                    label="Tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    label="Original Price"
                    name="originalPrice"
                    type="number"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Discount Price"
                    name="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                  <TextField
                    label="Stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  Update Product
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        </div>
      )}
    </>
  );
};

const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: "7px", // Rounded border for the entire table
      border: "2px solid #ddd", // Border around the table
      overflow: "hidden", // Hide overflow to keep rounded borders
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f4f4f4", // Background color for header
      borderRadius: "15px 15px 0 0", // Rounded top corners for the header
    },
  },
  rows: {
    style: {
      borderRadius: "0", // Reset border radius for rows
      borderBottom: "1px solid #ddd", // Optional: Add a border between rows
    },
  },
  pagination: {
    style: {
      borderRadius: "0 0 25px 15px", // Rounded bottom corners for pagination
    },
  },
  cells: {
    style: {
      padding: "10px 16px", // Adjust padding as needed
    },
  },
};

export default AllProducts;
