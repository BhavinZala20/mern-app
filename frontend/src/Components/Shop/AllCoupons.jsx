import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../Styles/styles";
import Loader from "../Layout/Loader";
import { server } from "../../server";
import { toast } from "react-toastify";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coupouns, setCoupouns] = useState([]);
  const [minAmount, setMinAmout] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [selectedProduct, setSelectedProducts] = useState(null);
  const [value, setValue] = useState(null);
  const [filteredCoupons, setFilteredCoupones] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupounCode/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    setFilteredCoupones(
      coupouns?.filter((coupoun) => {
        const name = coupoun.name?.toLowerCase() || "";
        const selectedProduct = coupoun.selectedProduct?.toLowerCase() || "";
        const value = coupoun.value?.toString() || "";
        const minAmount = coupoun.minAmount?.toString() || "";
        const maxAmount = coupoun.maxAmount?.toString() || "";
        const createdDate = new Date(coupoun.createdAt)
          .toLocaleDateString()
          .toLowerCase();
        return (
          name.includes(searchQuery.toLowerCase()) ||
          selectedProduct.includes(searchQuery.toLowerCase()) ||
          value.includes(searchQuery) ||
          minAmount.includes(searchQuery) ||
          maxAmount.includes(searchQuery) ||
          createdDate.includes(searchQuery.toLowerCase())
        );
      })
    );
  }, [coupouns, searchQuery]);

  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupounCode/delete-coupon/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Coupon code deleted succesfully");
      });
    window.location.reload();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupounCode/create-coupon-code`,
        {
          name,
          minAmount,
          maxAmount,
          selectedProduct,
          value,
          shopId: seller._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Coupon code created successfully");
        setOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const columns = [
    {
      name: "Coupon Code",
      selector: (row) => row.name,
      sortable: true,
      minWidth: "130px",
      width: "130px",
    },
    {
      name: "Value",
      selector: (row) => row.value,
      sortable: true,
      minWidth: "100px",
      width: "100px",
    },
    {
      name: "Product Name",
      selector: (row) => row.selectedProduct,
      sortable: true,
      minWidth: "130px",
      width: "130px",
    },
    {
      name: "Min Amount",
      selector: (row) => row.minAmount,
      sortable: true,
      minWidth: "130px",
      width: "130px",
    },
    {
      name: "Max Amount",
      selector: (row) => row.maxAmount,
      sortable: true,
      minWidth: "130px",
      width: "130px",
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
      minWidth: "120px",
      width: "120px",
    },
    {
      name: "Delete",
      cell: (row) => (
        <Button onClick={() => handleDelete(row.id)}>
          <AiOutlineDelete size={20} />
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      minWidth: "120px",
    },
  ];

  const data = filteredCoupons?.map((item) => ({
    id: item._id,
    name: item.name,
    selectedProduct: item.selectedProduct,
    minAmount: item.minAmount,
    maxAmount: item.maxAmount,
    value: item.value + " %",
    createdAt: item.createdAt,
  }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full mx-8 pt-1 mt-10 bg-white ml-10">
          <h3 className="text-[22px] font-Roboto pb-2">All Coupon</h3>
          <div className="w-full flex justify-between items-center mb-4">
            <div
              className={`${styles.button} !w-max !h-[45px] px-3 !rounded-[5px] mr-3 mb-3`}
              onClick={() => setOpen(true)}
            >
              <span className="text-white">Add</span>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className={`mb-4 p-2 border rounded-md transition-colors duration-300 ${
                searchQuery
                  ? "border-blue-400" // Border color when searchQuery is not empty
                  : "border-gray-500" // Default border color
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <DataTable
            columns={columns}
            data={data}
            pagination
            customStyles={customStyles}
            highlightOnHover
          />
          {open && (
            <div className="fixed top-0 left-0 w-full h-screen bg-[#00000062] z-[20000] flex items-center justify-center">
              <div className="w-[90%] 800px:w-[40%] h-[80vh] bg-white rounded-md shadow p-4 overflow-y-scroll">
                <div className="w-full flex justify-end">
                  <RxCross1
                    size={30}
                    className="cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <h5 className="text-[30px] font-Poppins text-center">
                  Add Coupon code
                </h5>
                {/* create coupoun code */}
                <form onSubmit={handleSubmit} aria-required={true}>
                  <br />
                  <div>
                    <TextField
                      label="Coupon Name"
                      type="text"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your coupon name"
                      autoComplete="name"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Discount %"
                      type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Enter your coupon discount value "
                      autoComplete="value"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Min Amount"
                      type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={minAmount}
                      onChange={(e) => setMinAmout(e.target.value)}
                      placeholder="Enter your coupon code min amount "
                      autoComplete="minAmount"
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      label="Max Amount"
                      type="number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      required
                      value={maxAmount}
                      onChange={(e) => setMaxAmount(e.target.value)}
                      placeholder="Enter your coupon code max amount "
                      autoComplete="minAmount"
                    />
                  </div>
                  <br />
                  <div>
                    <label className="pb-2">Selected Product</label>
                    <select
                      className="w-full mt-2 border h-[35px] rounded-[5px]"
                      value={selectedProduct}
                      onChange={(e) => setSelectedProducts(e.target.value)}
                    >
                      <option value="Choose your selected products">
                        Choose a selected product
                      </option>
                      {products &&
                        products.map((i) => (
                          <option value={i.name} key={i.name}>
                            {i.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <br />
                  <div>
                    <input
                      type="submit"
                      value="Create"
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
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

export default AllCoupons;
