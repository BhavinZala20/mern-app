import React from "react";
import Header from "../Components/Layout/Header";
import Categories from "../Components/Route/Categories/Categories";
import BestDeals from "../Components/Route/BestDeals/BestDeals";
import Events from "../Components/Events/Events";
import Footer from "../Components/Layout/Footer";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Categories />
      <BestDeals />
      <Events />
      <Footer />
    </div>
  );
};

export default HomePage;
