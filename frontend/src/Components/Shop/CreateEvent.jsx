import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../Redux/actions/event";
import { toast } from "react-toastify";
import { categoriesData } from "../../static/data";
import { RiImageAddLine } from "react-icons/ri";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Event created successfully");
      navigate("/dashboard-events");
      // window.location.reload();
    }
  }, [error, success, navigate]);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString.slice(
      0,
      10
    );
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate
    ? new Date(startDate.getTime() + 1 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : "";

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate?.toISOString());
    newForm.append("Finish_Date", endDate?.toISOString());
    dispatch(createEvent(newForm));
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[25px] font-Poppins text-center">Create Event</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Product Name"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name"
            autoComplete="name"
          />
        </div>
        <br />
        <div>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Choose category
            </option>
            {categoriesData &&
              categoriesData.map((item) => (
                <option value={item.title} key={item.title}>
                  {item.title}
                </option>
              ))}
          </select>
        </div>
        <br />
        <div>
          <TextField
            label="Description"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            required
            multiline
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description"
            autoComplete="description"
          />
        </div>
        <br />
        <div>
          <TextField
            label="Tag"
            type="text"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your product tags"
            autoComplete="tags"
          />
        </div>
        <br />
        <div>
          <TextField
            label="Original Price"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price"
            autoComplete="originalPrice"
          />
        </div>
        <br />
        <div>
          <TextField
            label="Discount Price"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your discount product price"
            autoComplete="discountPrice"
          />
        </div>
        <br />
        <div>
          <TextField
            label="Stock"
            type="number"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock"
            autoComplete="stock"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Event Start Date</label>
          <TextField
            label=""
            type="date"
            id="start-date"
            variant="outlined"
            size="small"
            fullWidth
            required
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            onChange={handleStartDateChange}
            min={today}
            // placeholder="Enter your product stock"
            autoComplete="startDate"
          />
        </div>
        <br />
        <div>
          <label className="pb-2">Event End Date</label>
          <TextField
            label=""
            type="date"
            variant="outlined"
            id="start-date"
            size="small"
            fullWidth
            required
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            onChange={handleEndDateChange}
            min={minEndDate}
            // placeholder="Enter your product stock"
          />
        </div>
        <br />
        <div>
          <label className="block pb-2 text-sm font-medium text-black-900">
            Upload Product Images
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <RiImageAddLine size={30} className="mt-3" color="#555" />
            </label>
            {images &&
              images.map((i) => (
                <img
                  src={URL.createObjectURL(i)}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))}
          </div>
          <br />
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
