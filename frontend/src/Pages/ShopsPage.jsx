import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../Components/Layout/Footer";
import Header from "../Components/Layout/Header";
import Loader from "../Components/Layout/Loader";
import ShopCard from "../Components/Route/ShopCard/ShopCard";
import styles from "../Styles/styles";

const ShopsPage = () => {
  const { allShops, isLoading } = useSelector((state) => state.shops);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (allShops && allShops.length > 0) {
      setData(allShops);
    }
  }, [allShops]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ShopCard data={i} key={index} />)}
            </div>

            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No shop Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ShopsPage;
