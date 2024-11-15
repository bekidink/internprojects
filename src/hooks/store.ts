import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Configure the store with the cart reducer
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
