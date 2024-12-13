import React, { useEffect, useState } from "react";
import { background_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styles from "../../Styles/styles";
import { TextField, Button, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { City, Country, State } from "country-state-city";
import {
  updateUserInformation,
  updatUserAddress,
  loadUser,
  deleteUserAddress,
} from "../../Redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { getAllOrdersOfUser } from "../../Redux/actions/order";
import { MdTrackChanges } from "react-icons/md";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    await axios
      .put(`${server}/auth/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        dispatch(loadUser());
        toast.success("Photo updated successfully");
        // window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="w-full">
      {/* Profile */}
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${background_url}${user.avatar}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[blue]"
                alt=""
              />
              <div className="w-[30px] h-[30px] !bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <TextField
                    label="Full Name"
                    variant="outlined"
                    size="small"
                    className={`${styles.input} !w-[95%] !mb-5 800px:mb-0`}
                    fullWidth
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <TextField
                    label="Email"
                    variant="outlined"
                    size="small"
                    className={`${styles.input} !w-[95%] !mb-4 800px:mb-0`}
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="w-full 800px:flex block pb-3">
                <div className="w-[100%] 800px:w-[50%]">
                  <TextField
                    id="phoneNumber"
                    label="Phone Number"
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`${styles.input} !w-[95%] !mb-5 800px:mb-0`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                <div className="w-[100%] 800px:w-[50%]">
                  <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${styles.input} !w-[95%] !mb-4 800px:mb-0`}
                    variant="outlined"
                    size="small"
                    fullWidth
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>
              {/* <input
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                required
                value="Update"
                type="submit"
              /> */}
              <Button
                type="submit"
                variant="outlined"
                // color="primary"
                sx={{
                  borderColor: "#3a24db",
                  color: "#3a24db",
                  "&:hover": {
                    borderColor: "#3a24db",
                    backgroundColor: "rgba(58, 36, 219, 0.2)",
                  },
                }}
                // className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              >
                Update
              </Button>
            </form>
          </div>
        </>
      )}

      {/* order */}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}
      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change Password */}
      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/*  user Address */}
      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
      minWidth: "170px",
      width: "170px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={row.status === "Delivered" ? "greenColor" : "redColor"}
        >
          {row.status}
        </span>
      ),
      minWidth: "140px",
      width: "140px",
    },
    {
      name: "Items Qty",
      selector: (row) => row.itemsQty,
      sortable: true,
      minWidth: "130px",
      width: "130px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      minWidth: "130px",
      width: "130px", // Adjust width as needed
    },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "150px",
      width: "150px", // Adjust width as needed
    },
    {
      name: "",
      cell: (row) => (
        <Link to={`/user/order/${row.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "150px",
      width: "150px",
    },
  ];

  const data = orders
    ? orders.map((item) => ({
        id: item._id,
        itemsQty: item.cart.length,
        total: item.totalPrice + " ₹",
        status: item.status,
        createdAt: item.createdAt,
      }))
    : [];

  return (
    <div className="pl-8 pt-1">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing refund");

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={row.status === "Delivered" ? "greenColor" : "redColor"}
        >
          {row.status}
        </span>
      ),
      width: "130px",
    },
    {
      name: "Items Qty",
      selector: (row) => row.itemsQty,
      sortable: true,
      width: "130px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      width: "130px",
    },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "150px",
      // width: "100px", // Adjust width as needed
    },
    {
      name: "",
      cell: (row) => (
        <Link to={`/user/order/${row.id}`}>
          <Button>
            <AiOutlineArrowRight size={20} />
          </Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
  ];

  const data = eligibleOrders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: item.totalPrice + " ₹",
    status: item.status,
    createdAt: item.createdAt,
  }));

  return (
    <div className="pl-8 pt-1">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

const TrackOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <span
          className={row.status === "Delivered" ? "greenColor" : "redColor"}
        >
          {row.status}
        </span>
      ),
      width: "130px",
    },
    {
      name: "Items Qty",
      selector: (row) => row.itemsQty,
      sortable: true,
      width: "130px",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      width: "130px",
    },
    {
      name: "Order Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "130px",
      // width: "100px", // Adjust width as needed
    },
    {
      name: "",
      cell: (row) => (
        <Link to={`/user/track/order/${row.id}`}>
          <Button>
            <MdTrackChanges size={20} />
          </Button>
        </Link>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "150px",
    },
  ];

  const data = orders?.map((item) => ({
    id: item._id,
    itemsQty: item.cart.length,
    total: item.totalPrice + " ₹",
    status: item.status,
    createdAt: item.createdAt,
  }));

  return (
    <div className="pl-8 pt-1">
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        customStyles={customStyles}
        responsive
      />
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/auth/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.success);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <TextField
              label="Old Password"
              type={visible ? "text" : "password"}
              variant="outlined"
              size="small"
              className={`${styles.input} !w-[95%] !mb-5 800px:mb-0`}
              fullWidth
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter your old password"
              autoComplete="oldPassword"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <TextField
              label="New Password"
              type={visible ? "text" : "password"}
              variant="outlined"
              size="small"
              className={`${styles.input} !w-[95%] !mb-5 800px:mb-0`}
              fullWidth
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              autoComplete="newPassword"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </IconButton>
                ),
              }}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <TextField
              label="Confirm Password"
              type={visible ? "text" : "password"}
              variant="outlined"
              size="small"
              className={`${styles.input} !w-[95%] !mb-5 800px:mb-0`}
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Enter your confirm password"
              autoComplete="confirmPassword"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setVisible(!visible)}>
                    {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </IconButton>
                ),
              }}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "" || state === "") {
      toast.error("Please fill all the fields");
    } else {
      dispatch(
        updatUserAddress(country, state, city, address1, zipCode, addressType)
      );
      setOpen(false);
      setCountry("");
      setState("");
      setCity("");
      setAddress1("");
      setZipCode(null);
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="800px:w-[40%] h-[75vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your State</label>
                    <select
                      name=""
                      id=""
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      disabled={!country}
                    >
                      <option value="" className="block border pb-2">
                        Choose your State
                      </option>
                      {State.getStatesOfCountry(country).map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full pb-2 mb-3">
                    <label className="block pb-2">Choose your City</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                      disabled={!state}
                    >
                      <option value="" className="block border pb-2">
                        Choose your City
                      </option>
                      {City.getCitiesOfState(country, state).map((item) => (
                        <option
                          className="block pb-2"
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full pb-2 mb-3">
                    <TextField
                      label="Address"
                      type="address"
                      variant="outlined"
                      fullWidth
                      required
                      size="small"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      // className={`${styles.input} !w-[95%] !mb-2 800px:mb-0`}
                      multiline
                      placeholder="Enter your address"
                      autoComplete="address"
                    />
                  </div>

                  <div className="w-full pb-2 mb-3">
                    <TextField
                      label="Pin Code"
                      type="number"
                      variant="outlined"
                      fullWidth
                      required
                      size="small"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      // className={`${styles.input} !w-[95%] !mb-2 800px:mb-0`}
                      placeholder="Enter your Pin Code"
                      autoComplete="number"
                    />
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
            key={index}
          >
            <div className="flex items-center">
              <h5 className="pl-5 font-[600]">{item.addressType}</h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {item.address1}
              </h6>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="text-[12px] 800px:text-[unset]">
                {user && user.phoneNumber}
              </h6>
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer"
                onClick={() => handleDelete(item)}
              />
            </div>
          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address
        </h5>
      )}
    </div>
  );
};

const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: "7px", // Rounded border for the entire table
      border: "2px solid #ddd", // Border around the table
      overflow: "hidden", // Hide overflow to keep rounded borders
    },
  },
  headRow: {
    style: {
      backgroundColor: "#f4f4f4", // Background color for header
      borderRadius: "15px 15px 0 0", // Rounded top corners for the header
    },
  },
  rows: {
    style: {
      borderRadius: "0", // Reset border radius for rows
      borderBottom: "1px solid #ddd", // Optional: Add a border between rows
    },
  },
  pagination: {
    style: {
      borderRadius: "0 0 15px 15px", // Rounded bottom corners for pagination
    },
  },
  cells: {
    style: {
      padding: "8px 16px", // Adjust padding as needed
    },
  },
};

export default ProfileContent;
