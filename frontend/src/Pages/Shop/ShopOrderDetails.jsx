import React from "react";
import DashboardHeader from "../../Components/Shop/Layout/DashboardHeader";
import Footer from "../../Components/Layout/Footer";
import OrderDetails from "../../Components/Shop/OrderDetails.jsx";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <OrderDetails />
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
