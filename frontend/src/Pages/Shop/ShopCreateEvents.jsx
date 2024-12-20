import React from "react";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import CreateEvent from "../../Components/Shop/CreateEvent";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";

const ShopCreateEvents = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvents;
