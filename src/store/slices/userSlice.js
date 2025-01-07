import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user"))
    ? JSON.parse(localStorage.getItem("user"))
    : {},
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUser: (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.user = {};
    },
  },
});

export const { deleteUser } = userSlice.actions;

export default userSlice.reducer;
