import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { instance } from '../Utilis/axiosConfig';
const initialState = {
  subCategoryData: [],
};
export const getSubcategory = createAsyncThunk('subcategory', async (_, { rejectWithValue }) => {
  try {
    let response = await instance.get(`/subcategory`);
    return response.data;
  } catch (err) {
    if (!err.response) {
      throw err;
    }
    return rejectWithValue(err.response);
  }
});
const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState,
  reducers: {
    SetSubCategoryData:(state,{payload})=>{
      console.log(payload,"shshsh")
      state.subCategoryData=payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSubcategory.rejected).addCase(getSubcategory.fulfilled, (state, { payload }) => {
      let { subCategoryData } = payload;
      state.subCategoryData = subCategoryData;
      
    });
  }
});
export const { SetSubCategoryData } = subcategorySlice.actions;
export const selectSubcategory = (state) => state.subcategory;
export default subcategorySlice.reducer;
