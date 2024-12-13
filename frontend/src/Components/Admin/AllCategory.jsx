import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
} from "../../Redux/actions/category";

const AllCategory = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategory, setFilteredCategory] = useState([]);
  const { category, isLoading } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    setFilteredCategory(
      category?.filter((category) => {
        const name = category.name?.toLowerCase() || "";
        const createdDate = new Date(category.createdAt)
          .toLocaleDateString()
          .toLowerCase();
        return (
          name.includes(searchQuery.toLowerCase()) ||
          createdDate.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [category, searchQuery]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;
    await dispatch(deleteCategory(id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    newForm.append("name", name);
    dispatch(createCategory(newForm));
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "120px",
      width: "120px",
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
    },
  ];

  const data = filteredCategory?.map((item) => ({
    id: item._id,
    name: item.name,
    createdAt: item.createdAt,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white ml-10">
          <h3 className="text-[22px] font-Roboto pb-2">All Categories</h3>
          <div className="w-full flex justify-between items-center mb-4">
            <div
              className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer"
              onClick={() => setOpen(true)}
            >
              Add
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="mb-4 p-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            pagination
            highlightOnHover
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[75%] 800px:w-[30%] h-[50vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center mb-4 mr-2">
                  Add Category
                </h5>
                <form onSubmit={handleSubmit}>
                  <div>
                    <TextField
                      label="Category Name"
                      type="text"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter category name"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-3 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
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
      borderRadius: "0 0 15px 15px", // Rounded bottom corners for pagination
    },
  },
  cells: {
    style: {
      padding: "8px 16px", // Adjust padding as needed
    },
  },
};

export default AllCategory;
