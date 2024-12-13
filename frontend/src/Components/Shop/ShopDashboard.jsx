import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "../../Styles/styles";
import { Link } from "react-router-dom";
import { MdListAlt, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../Redux/actions/order";
import { getAllShopProducts } from "../../Redux/actions/product";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { RiShoppingBag4Line } from "react-icons/ri";

const ShopDashboard = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
    dispatch(getAllShopProducts(seller._id));
  }, [dispatch]);

  const availableBalance = seller?.availableBalance.toFixed(2);

  return (
    <div className="w-full p-8">
      <h3 className="text-[22px] font-Poppins pb-3">Overview</h3>
      <div className="w-full block 800px:flex items-center justify-between">
        <div className="w-full mb-4 800px:w-[25%] min-h-[23vh] bg-white shadow rounded px-3 py-4">
          <div className="flex items-center">
            <MdOutlineAccountBalanceWallet
              size={30}
              className="mr-2"
              fill="#00000099"
            />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              Account Balance
              {/* <span className="text-[16px]">(with 10% service charge)</span> */}
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {availableBalance} ₹
          </h5>
          {/* <Link to="/dashboard-withdraw-money">
            <h5 className="pt-4 pl-[2] text-[#077f9c]">Withdraw Money</h5>
          </Link> */}
        </div>

        <div className="w-full mb-4 800px:w-[25%] min-h-[23vh] bg-white shadow rounded px-3 py-4">
          <div className="flex items-center">
            <MdListAlt size={30} className="mr-2" fill="#00000099" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Orders
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {orders && orders.length}
          </h5>
          <Link to="/dashboard-orders">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
          </Link>
        </div>

        <div className="w-full mb-4 800px:w-[25%] min-h-[23vh] bg-white shadow rounded px-3 py-4">
          <div className="flex items-center">
            <RiShoppingBag4Line size={30} className="mr-2" fill="#00000099" />
            <h3
              className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
            >
              All Products
            </h3>
          </div>
          <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
            {products && products.length}
          </h5>
          <Link to="/dashboard-products">
            <h5 className="pt-4 pl-2 text-[#077f9c]">View Products</h5>
          </Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default ShopDashboard;
