import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import historyService from "./historyService";

const initialState = {
  historyList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple history records
export const getHistoryData = createAsyncThunk(
  "history/getHistoryData",
  async (_, thunkAPI) => {
    try {
      return await historyService.getHistory();
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

export const historySlice = createSlice({
  name: "history",
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
      .addCase(getHistoryData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getHistoryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.historyList = action.payload;
      })
      .addCase(getHistoryData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = historySlice.actions;
export default historySlice.reducer;
