import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: JSON.parse(localStorage.getItem("fav"))
    ? JSON.parse(localStorage.getItem("fav"))
    : [],
};

export const favSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      let check = false;
      state.favorites.map((item) => {
        if (item.id === action.payload.id) {
          check = true;
          return;
        }
      });

      if (check) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.favorites.push(action.payload);
      }

      localStorage.setItem("fav", JSON.stringify(state.favorites));
    },
    deleteFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("fav", JSON.stringify(state.favorites));
    },

    deleteAllFavorites: (state) => {
      state.favorites = [];
      localStorage.setItem("fav", JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, deleteFavorite, deleteAllFavorites } =
  favSlice.actions;

export default favSlice.reducer;
