import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = true;
      state.product = action.payload;
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Get all products of shop
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
    })
    .addCase("getAllProductsShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete product of a shop
    .addCase("deleteShopProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteShopProductSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteShopProductFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all products

    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload;
    })
    .addCase("getAllProductsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Update Product
    .addCase("productUpdateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productUpdateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    })
    .addCase("productUpdateFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
export { productReducer };
