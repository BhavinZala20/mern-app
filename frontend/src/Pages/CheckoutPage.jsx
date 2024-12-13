import React from "react";
import Header from "../Components/Layout/Header";
import CheckoutSteps from "../Components/Checkout/CheckoutSteps";
import Checkout from "../Components/Checkout/Checkout.jsx";
import Footer from "../Components/Layout/Footer";

const CheckoutPage = () => {
  return (
    <div>
      <Header />
      <br />
      <br />
      <CheckoutSteps active={1} />
      <Checkout />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default CheckoutPage;
