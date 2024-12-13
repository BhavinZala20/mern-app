import React from "react";
import AdminHeader from "../../Components/Layout/AdminHeader";
import AdminSideBar from "../../Components/Admin/Layout/AdminSideBar";
import AllCategory from "../../Components/Admin/AllCategory";

const AdminDashboardCategory = () => {
  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={7} />
          </div>
          <AllCategory />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCategory;
