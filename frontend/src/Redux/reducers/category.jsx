import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const categoryReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("categoryCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("categoryCreateSuccess", (state, action) => {
      state.isLoading = true;
      state.category = action.payload;
      state.success = true;
    })
    .addCase("categoryCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    // Get all categories
    .addCase("getAllCategoriesRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllCategoriesSuccess", (state, action) => {
      state.isLoading = false;
      state.category = action.payload;
    })
    .addCase("getAllCategoriesFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // Delete category
    .addCase("deleteCategoryRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCategorySuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteCategoryFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export { categoryReducer };
