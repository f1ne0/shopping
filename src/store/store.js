import { configureStore } from "@reduxjs/toolkit";
import basketsReducer from "./slices/basketSlice";
import favReducer from "./slices/favSlice";
import userReducer from "./slices/userSlice";
import checkoutReducer from "./slices/checkoutSlice";

const store = configureStore({
  reducer: {
    basket: basketsReducer,
    favorite: favReducer,
    user: userReducer,
    checkout: checkoutReducer,
  },
});

export default store;
