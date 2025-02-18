import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import coreService from "./coreService";

const initialState = {
  coreList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple cores
export const getCoreData = createAsyncThunk(
  "core/getCoreData",
  async (_, thunkAPI) => {
    try {
      return await coreService.getCore();
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

export const coreSlice = createSlice({
  name: "core",
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
      .addCase(getCoreData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCoreData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.coreList = action.payload;
      })
      .addCase(getCoreData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = coreSlice.actions;
export default coreSlice.reducer;
