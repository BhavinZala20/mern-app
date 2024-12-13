import React, { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { server } from "../../server";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`${server}/event/admin-all-events`, { withCredentials: true })
      .then((res) => {
        setEvents(res.data.events);
        setFilteredEvents(res.data.events);
      });
  }, []);

  useEffect(() => {
    const result = events.filter((event) => {
      return (
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.status.toLowerCase().includes(search.toLowerCase()) ||
        event.originalPrice
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.discountPrice
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        event.stock.toString().includes(search) ||
        event.sold_out.toString().includes(search)
      );
    });
    setFilteredEvents(result);
  }, [search, events]);

  const columns = [
    {
      name: "Product Id",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "150px",
      width: "150px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "150px",
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Price",
      selector: (row) => row.originalPrice,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Discount Price",
      selector: (row) => row.discountPrice,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Stock",
      selector: (row) => row.Stock,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Sold out",
      selector: (row) => row.sold,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Creation Date",
      selector: (row) => new Date(row.creationDate).toLocaleDateString(),
      sortable: true,
      minWidth: "150px",
      width: "150px",
    },
    {
      name: "Preview",
      cell: (row) => (
        <Link to={`/product/${row.id}?isEvent=true`}>
          <AiOutlineEye size={20} />
        </Link>
      ),
      minWidth: "100px",
      width: "100px",
    },
  ];

  const data = filteredEvents.map((item) => ({
    id: item._id,
    name: item.name,
    status: item.status,
    originalPrice: `${item.originalPrice} ₹`,
    discountPrice: `${item.discountPrice} ₹`,
    Stock: item.stock,
    sold: item.sold_out,
    creationDate: item.createdAt,
  }));

  return (
    <div className="w-full flex flex-col items-center pt-5">
      <div className="w-[97%]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[22px] font-Roboto pb-2">All Events</h3>
          <input
            type="text"
            placeholder="Search..."
            className="mb-4 p-2 border border-gray-300 rounded-md"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataTable
            columns={columns}
            data={data}
            pagination
            highlightOnHover
            responsive
          />
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
