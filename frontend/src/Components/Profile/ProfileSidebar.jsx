import axios from "axios";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { PiMapPinArea } from "react-icons/pi";
import { RiAdminLine, RiLockPasswordLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import { TbCreditCardRefund, TbLogout2, TbMessage } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { toast } from "react-toastify";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ setActive, active }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios
      .get(`${server}/auth/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <TbCreditCardRefund size={20} color={active === 3 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <TbMessage size={20} color={active === 4 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <PiMapPinArea size={20} color={active === 5 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <FaRegAddressCard size={20} color={active === 7 ? "blue" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-[blue]" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>
      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <RiAdminLine size={20} color={active === 7 ? "blue" : ""} />
            <span
              className={`pl-3 ${
                active === 8 ? "text-[blue]" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={logoutHandler}
      >
        <TbLogout2 size={20} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-[red]" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
