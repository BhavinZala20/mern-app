import axios from "axios";
import { server } from "../../server";

// create product
export const createProduct =
  (
    name,
    description,
    category,
    tags,
    originalPrice,
    discountPrice,
    stock,
    shopId,
    images
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/product/create-product`,
        name,
        description,
        category,
        tags,
        originalPrice,
        discountPrice,
        stock,
        shopId,
        images
      );
      dispatch({
        type: "productCreateSuccess",
        payload: data.product,
      });
    } catch (error) {
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

// Get All Shop Products
export const getAllShopProducts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/get-all-shop-products/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// Delete Shop Products
export const deleteShopProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteShopProductRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteShopProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteShopProductFailed",
      payload: error.response.data.message,
    });
  }
};

// Get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};

// Update Product Action
export const updateProduct = (productId, updatedData) => async (dispatch) => {
  try {
    dispatch({ type: "productUpdateRequest" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${server}/product/update-product/${productId}`,
      updatedData,
      config
    );

    dispatch({
      type: "productUpdateSuccess",
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: "productUpdateFailed",
      payload: error.response.data.message,
    });
  }
};
