import axios from "axios";
import { server } from "../../server";

// Get all shops
export const getAllShops = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopRequest",
    });
    
    const { data } = await axios.get(`${server}/shop/get-all-shops`);
    dispatch({
      type: "getAllShopSuccess",
      payload: data.shops,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopFailed",
      payload: error.response.data.message,
    });
  }
};
