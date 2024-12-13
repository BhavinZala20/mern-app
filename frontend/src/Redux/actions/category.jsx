import axios from "axios";
import { server } from "../../server";

export const createCategory = (name) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/category/create-category`,
      name
    );
    dispatch({
      type: "categoryCreateSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "categoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Get All Shop Products
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoriesRequest",
    });
    const { data } = await axios.get(`${server}/category/get-all-category`);
    dispatch({
      type: "getAllCategoriesSuccess",
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCategoryRequest",
    });
    const { data } = await axios.delete(
      `${server}/category/delete-category/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "deleteCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFailed",
      payload: error.response.data.message,
    });
  }
};
