import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteShopEvent, getAllShopEvents } from "../../Redux/actions/event";
import Loader from "../Layout/Loader";
import DataTable from "react-data-table-component";

const AllEvents = () => {
  const { events, isLoading, message, error } = useSelector(
    (state) => state.events
  );
  const { seller } = useSelector((state) => state.seller);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllShopEvents(seller._id));
  }, [dispatch, seller._id]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  useEffect(() => {
    setFilteredEvents(
      events?.filter((event) => {
        const name = event.name.toLowerCase();
        const price = event.originalPrice.toString();
        const discountPrice = event.discountPrice.toString();
        const stock = event.stock.toString();
        const sold = event.sold_out.toString();
        const eventDate = new Date(event.createdAt)
          .toLocaleDateString()
          .toLowerCase();
        return (
          name.includes(searchQuery.toLowerCase()) ||
          price.includes(searchQuery) ||
          discountPrice.includes(searchQuery) ||
          stock.includes(searchQuery) ||
          sold.includes(searchQuery) ||
          eventDate.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [events, searchQuery]);

  const handleDelete = (id) => {
    dispatch(deleteShopEvent(id));
    window.location.reload();
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "150px",
      width: "150px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Discount Price",
      selector: (row) => row.discountPrice,
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Stock",
      selector: (row) => row.stock,
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Sold out",
      selector: (row) => row.sold,
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Preview",
      cell: (row) => {
        // const product_name = row.name.replace(/\s+/g, "-");
        return (
          // <Link to={`/product/${product_name}`}>
          <Link to={`/product/${row.id}?isEvent=true`}>
            <Button>
              <AiOutlineEye size={20} />
            </Button>
          </Link>
        );
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
      minWidth: "120px",
      width: "120px",
    },
  ];

  const data = filteredEvents?.map((item) => ({
    id: item._id,
    name: item.name,
    price: item.originalPrice + " ₹",
    discountPrice: item.discountPrice + " ₹",
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
            <h3 className="text-[22px] font-Roboto pb-2">All Events</h3>
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
      borderRadius: "0 0 15px 15px", // Rounded bottom corners for pagination
    },
  },
  cells: {
    style: {
      padding: "8px 16px", // Adjust padding as needed
    },
  },
};
export default AllEvents;
