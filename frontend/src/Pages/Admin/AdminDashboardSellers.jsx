import React from "react";
import AdminHeader from "../../Components/Layout/AdminHeader";
import AdminSideBar from "../../Components/Admin/Layout/AdminSideBar";
import AllSellers from "../../Components/Admin/AllSellers";

const AdminDashboardSellers = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={3} />
          </div>
          <AllSellers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardSellers;
