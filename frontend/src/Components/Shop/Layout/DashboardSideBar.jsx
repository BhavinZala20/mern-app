import React from "react";
import { CiDeliveryTruck, CiSettings } from "react-icons/ci";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import {
  MdDashboard,
  MdEvent,
  MdOutlineDiscount,
  MdOutlineNotificationsActive,
  MdPostAdd,
} from "react-icons/md";
import { RiMoneyRupeeCircleLine, RiShoppingBag4Line } from "react-icons/ri";
import { VscNewFile } from "react-icons/vsc";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <MdDashboard size={30} color={`${active === 1 ? "blue" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 1 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <CiDeliveryTruck
            size={30}
            color={`${active === 2 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 2 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <RiShoppingBag4Line
            size={30}
            color={`${active === 3 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 3 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <MdPostAdd size={30} color={`${active === 4 ? "blue" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 4 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdEvent size={30} color={`${active === 5 ? "blue" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 5 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile size={30} color={`${active === 6 ? "blue" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 6 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <MdOutlineNotificationsActive
            size={30}
            color={`${active === 7 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 7 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Shop Inbox
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-coupons" className="w-full flex items-center">
          <MdOutlineDiscount
            size={30}
            color={`${active === 8 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard-refunds" className="w-full flex items-center">
          <RiMoneyRupeeCircleLine
            size={30}
            color={`${active === 9 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 9 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Refunds
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <IoSettingsOutline
            size={30}
            color={`${active === 10 ? "blue" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${
              active === 10 ? "text-[blue]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
