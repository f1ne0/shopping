import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  baskets: JSON.parse(localStorage.getItem("basket"))
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
};

export const basketsSlice = createSlice({
  name: "baskets",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      let check = false;
      check = state.baskets.some((item) => item.id === action.payload.id);

      if (check) {
        state.baskets = state.baskets.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.baskets.push({ ...action.payload, count: 1 });
      }

      localStorage.setItem("basket", JSON.stringify(state.baskets));
    },
    deleteItem: (state, action) => {
      state.baskets = state.baskets.filter(
        (basket) => basket.id !== action.payload
      );
      localStorage.setItem("basket", JSON.stringify(state.baskets));
    },
    deleteAll: (state) => {
      state.baskets = [];
      localStorage.setItem("basket", JSON.stringify(state.baskets));
    },
    plusCountBasket: (state, action) => {
      state.baskets = state.baskets.map((item) => {
        if (item.id === action.payload) {
          return { ...item, count: (item.count += 1) };
        } else {
          return item;
        }
      });
      localStorage.setItem("basket", JSON.stringify(state.baskets));
    },
    minusCountBasket: (state, action) => {
      state.baskets = state.baskets.map((item) => {
        if (item.id === action.payload) {
          return { ...item, count: (item.count -= 1) };
        } else {
          return item;
        }
      });
      localStorage.setItem("basket", JSON.stringify(state.baskets));
    },
  },
});

export const {
  addToBasket,
  deleteItem,
  deleteAll,
  plusCountBasket,
  minusCountBasket,
} = basketsSlice.actions;

export default basketsSlice.reducer;
