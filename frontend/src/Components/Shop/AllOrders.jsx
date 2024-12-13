import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllOrdersOfShop } from "../../Redux/actions/order";
import { AiOutlineArrowRight } from "react-icons/ai";
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    setFilteredOrders(
      orders?.filter((order) => {
        const orderId = order._id?.toLowerCase() || "";
        const status = order.status?.toLowerCase() || "";
        const itemsQty = order.cart?.length.toString() || "";
        const totalPrice = order.totalPrice?.toString() || "";
        const orderDate = new Date(order.createdAt)
          .toLocaleDateString()
          .toLowerCase();
        return (
          orderId.includes(searchQuery.toLowerCase()) ||
          status.includes(searchQuery.toLowerCase()) ||
          itemsQty.includes(searchQuery) ||
          totalPrice.includes(searchQuery) ||
          orderDate.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [orders, searchQuery]);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "150px",
      // width: "150px", // Adjust width as needed
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      minWidth: "150px",
      // width: "130px", // Adjust width as needed
    },
    {
      name: "Items Qty",
      selector: (row) => row.itemsQty,
      sortable: true,
      minWidth: "150px",
      // width: "130px", // Adjust width as needed
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      minWidth: "150px",
      // width: "100px", // Adjust width as needed
    },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "150px",
      // width: "100px", // Adjust width as needed
    },
    {
      name: "Action",
      cell: (row) => (
        <Link to={`/order/${row.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "150px",
      // width: "100px", // Adjust width as needed
    },
  ];

  const data = filteredOrders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: item.totalPrice + " ₹",
    status: item.status,
    createdAt: item.createdAt,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white ml-10">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[22px] font-Roboto pb-2">All Orders</h3>
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
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
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

export default AllOrders;
