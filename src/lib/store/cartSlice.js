import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    remove(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    incrementQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        state.totalItems += 1;
      }
    },
    decrementQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
      }
    },
  },
});

export const { add, remove, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
