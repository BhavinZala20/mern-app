import React from "react";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";
import ShopDashboard from "../../Components/Shop/ShopDashboard";

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={1} />
        </div>
        <ShopDashboard />
      </div>
    </div>
  );
};

export default ShopDashboardPage;
