import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import launchService from "./launchService";

const initialState = {
  launchList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple launches
export const getLaunchData = createAsyncThunk(
  "launch/getLaunchData",
  async (_, thunkAPI) => {
    try {
      return await launchService.getLaunch();
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

export const launchSlice = createSlice({
  name: "launch",
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
      .addCase(getLaunchData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLaunchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.launchList = action.payload;
      })
      .addCase(getLaunchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = launchSlice.actions;
export default launchSlice.reducer;
