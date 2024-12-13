import React from "react";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";
import "./Success.css";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="success-container">
      <div className="checkmark-circle">
        <div className="checkmark"></div>
      </div>
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Order Successful!
      </h5>
      <br />
      <p className="text-[20px]">
        <span>
          Thank you for your purchase. Your order has been placed successfully.
        </span>
      </p>
      <br />
    </div>
  );
};

export default OrderSuccessPage;
