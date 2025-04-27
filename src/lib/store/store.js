import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import  productSlice  from "./productSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      products: productSlice,
    },
  });
}

export default makeStore;
