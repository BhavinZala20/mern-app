import React, { useEffect, useState, useRef } from "react";
import styles from "../../Styles/styles";
import { Link } from "react-router-dom";
import l1 from "../../assets/l2.jpg";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineShop,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { categoriesData } from "../../static/data";
import { IoIosArrowDown } from "react-icons/io";
import { TbMenu2 } from "react-icons/tb";
import DropDown from "./DropDown";
import Navbar from "./Navbar.jsx";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { background_url, server } from "../../server";
import Wishlist from "../Wishlist/Wishlist";
import Cart from "../Cart/Cart";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    let filteredProducts;
    if (searchCategory === "All") {
      filteredProducts = allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(term.toLowerCase()) &&
          product.category === searchCategory
      );
    }
    setSearchData(filteredProducts);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchData([]);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={l1}
                alt="Logo"
                style={{ width: "250px", height: "90px" }}
              />
            </Link>
          </div>
          <div className="w-[50%] relative flex items-center">
            <div className="relative w-[100px]" ref={searchRef}>
              <button
                className="h-[40px] w-full flex justify-between items-center px-2 border-[#828A95] border-[2px] rounded-l-md bg-white"
                onClick={() => setDropDown(!dropDown)}
              >
                {searchCategory}
                <IoIosArrowDown size={20} />
              </button>
              {dropDown && (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              )}
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder={`Search for ${searchCategory.toLowerCase()}...`}
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-t-[#828A95] border-b-[#828A95] border-r-[#828A95] border-[2px] rounded-r-md"
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={`${background_url}${i.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>
          <div className={`${styles.button}`}>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isSeller ? "Go to Dashboard" : "Register Shop"}
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active ? "shadow-sm fixed top-0 left-0 z-10" : ""
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3a485dc4] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <TbMenu2 size={30} className="absolute top-3 left-2" />
          </div>
          {/* navitems */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[red] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[red] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      // src={`${user?.avatar?.url}`}
                      src={`${background_url}${user.avatar}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>
            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* Mobile Responsive header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed bottom-0 left-0 z-50" : null
        }
      w-full h-[60px] bg-[#fff] z-50 bottom-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between px-4 py-1">
          <div>
            <TbMenu2 size={40} className="ml-4" onClick={() => setOpen(true)} />
          </div>

          <div className="w-full p-4 flex items-center">
            <div className="relative w-full" ref={searchRef}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="h-[40px] w-full px-2 border-t-[#828A95] border-b-[#828A95] border-r-[#828A95] border-[2px] rounded-md"
              />
              <AiOutlineSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
              {searchData && searchData.length !== 0 ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div className="w-full flex items-start-py-3">
                            <img
                              src={`${background_url}${i.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>{i.name}</h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>

          <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
            <h1 className="text-[#fff] flex items-center">
              {isSeller ? "Go to Dashboard" : "Register Shop"}
              <AiOutlineShop size={30} className="text-gray-700" />
            </h1>
          </Link>
        </div>

        {/* Bottom Navigation Bar for Mobile */}
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200 z-[50]">
          <div className="flex justify-between items-center p-2">
            <Link to="/" className="flex flex-col items-center">
              <AiOutlineHome size={30} />
              <span className="text-xs">Home</span>
            </Link>
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              {cart && cart.length > 0 && (
                <span className="absolute right-[-8px] top-[0px] rounded-full bg-[red] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              )}
            </div>
            <div
              className="relative flex flex-col items-center cursor-pointer"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} />
              {wishlist && wishlist.length > 0 && (
                <span className="absolute right-[-8px] top-[0px] rounded-full bg-[red] w-4 h-4 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              )}
            </div>
            <Link
              to={isAuthenticated ? "/profile" : "/login"}
              className="flex flex-col items-center"
            >
              {isAuthenticated ? (
                <img
                  src={`${background_url}${user.avatar}`}
                  className="w-[35px] h-[35px] rounded-full"
                  alt=""
                />
              ) : (
                <CgProfile size={30} />
              )}
              <span className="text-xs">Profile</span>
            </Link>
          </div>
        </div>
      </div>
      {/* cart popup */}
      {openCart && <Cart setOpenCart={setOpenCart} />}
      {/* wishlist popup */}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
