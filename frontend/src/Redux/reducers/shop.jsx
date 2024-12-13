import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  // shops: [],
  // error: null,
};

const shopReducer = createReducer(initialState, (builder) => {
  builder
    // Get all shops
    .addCase("getAllShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopSuccess", (state, action) => {
      state.isLoading = false;
      state.allShops = action.payload;
    })
    .addCase("getAllShopFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});

export { shopReducer };
