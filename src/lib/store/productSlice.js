import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
const initialState = {
  data: [],
  status: 'idle',
}
export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProducts.fulfilled, (state, action) => {
      state.data = action.payload
      state.status = 'succeeded'
    })
    .addCase(getProducts.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(getProducts.rejected, (state) => {
      state.status = 'failed'
    })
  }
})
export const { fetchProducts } = productSlice.actions
export default productSlice.reducer
export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await fetch("https://admin.refabry.com/api/all/product/get");
  if (!response.ok) {
    throw new Error("Could not load products");
  }
  const data = await response.json();
  return data.data.data; 
});
