import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import capsuleService from "./capsuleService";

const initialState = {
  capsuleList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple capsules
export const getCapsuleData = createAsyncThunk(
  "capsule/getCapsuleData",
  async (_, thunkAPI) => {
    try {
      return await capsuleService.getCapsule();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const capsuleSlice = createSlice({
  name: "capsule",
  initialState,
  reducers: {
    reset: (state) => initialState,
    resetVariables: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCapsuleData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCapsuleData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.capsuleList = action.payload;
      })
      .addCase(getCapsuleData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = capsuleSlice.actions;
export default capsuleSlice.reducer;
