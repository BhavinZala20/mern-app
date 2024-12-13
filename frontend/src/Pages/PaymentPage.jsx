import React from "react";
import CheckoutSteps from "../Components/Checkout/CheckoutSteps";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";
import Payment from "../Components/Payment/Payment.jsx";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#f6f9fc]">
      <Header />
      <br />
      <br />
      <CheckoutSteps active={2} />
      <Payment />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default PaymentPage;
