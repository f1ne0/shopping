import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: JSON.parse(localStorage.getItem("order"))
    ? JSON.parse(localStorage.getItem("order"))
    : [],
};

export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("order", JSON.stringify(state.orders));
    },
    updateOrder: (state, action) => {
      state.orders.push(action.payload);
      localStorage.setItem("order", JSON.stringify(state.orders));
    },
  },
});

export const { addOrder } = checkoutSlice.actions;

export default checkoutSlice.reducer;




