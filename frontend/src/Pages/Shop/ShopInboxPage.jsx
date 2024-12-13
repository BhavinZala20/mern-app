import React from "react";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";
import DashboardMessages from "../../Components/Shop/DashboardMessages";

const ShopInboxPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={7} />
        </div>
        <DashboardMessages />
      </div>
    </div>
  );
};

export default ShopInboxPage;
