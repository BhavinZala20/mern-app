import React, { useEffect, useState } from "react";
import AdminHeader from "../../Components/Layout/AdminHeader";
import AdminSideBar from "../../Components/Admin/Layout/AdminSideBar";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfAdmin } from "../../Redux/actions/order";

const AdminDashboardOrders = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
  }, [dispatch]);

  useEffect(() => {
    const data =
      adminOrders?.map((item) => ({
        id: item._id,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
        total: item.totalPrice,
        status: item.status,
        createdAt: item.createdAt,
      })) || [];

    const result = data.filter((item) => {
      return (
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.status.toLowerCase().includes(search.toLowerCase()) ||
        item.total.toString().toLowerCase().includes(search.toLowerCase()) ||
        new Date(item.createdAt)
          .toLocaleDateString()
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

    setFilteredEvents(result);
  }, [search, adminOrders]);

  const columns = [
    { name: "Order ID", selector: (row) => row.id, sortable: true },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={row.status === "Delivered" ? "greenColor" : "redColor"}
        >
          {row.status}
        </span>
      ),
    },
    { name: "Items Qty", selector: (row) => row.itemsQty, sortable: true },
    { name: "Total", selector: (row) => `${row.total} ₹`, sortable: true },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
  ];

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={2} />
          </div>

          <div className="w-full flex flex-col items-center pt-5">
            <div className="w-[97%]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[22px] font-Roboto pb-2">All Orders</h3>
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
                  data={filteredEvents}
                  pagination
                  responsive
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardOrders;
