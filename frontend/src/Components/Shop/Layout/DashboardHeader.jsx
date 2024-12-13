import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import l1 from "../../../assets/l2.jpg";
import { BiSolidOffer } from "react-icons/bi";
import { MdEvent } from "react-icons/md";
import { FaRegMessage } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiShoppingBag4Line } from "react-icons/ri";
import { background_url } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img src={l1} alt="" style={{ width: "250px", height: "80px" }} />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/cupouns" className="800px:block hidden">
            <BiSolidOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdEvent color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link>
          <Link to="/dashboard-products" className="800px:block hidden">
            <RiShoppingBag4Line
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-orders" className="800px:block hidden">
            <CiDeliveryTruck
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to="/dashboard-messages" className="800px:block hidden">
            <FaRegMessage
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={`${background_url}${seller.avatar}`}
              alt=""
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
