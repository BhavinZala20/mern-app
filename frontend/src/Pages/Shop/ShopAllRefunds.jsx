import React from "react";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../Components/Shop/Layout/DashboardSideBar";
import AllRefundOrders from "../../Components/Shop/AllRefundOrders";

const ShopAllRefunds = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllRefundOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
