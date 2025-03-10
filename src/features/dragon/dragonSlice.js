import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dragonService from "./dragonService";

const initialState = {
  dragonList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple dragons
export const getDragonData = createAsyncThunk(
  "dragon/getDragonData",
  async (_, thunkAPI) => {
    try {
      return await dragonService.getDragons();
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

export const dragonSlice = createSlice({
  name: "dragon",
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
      .addCase(getDragonData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDragonData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dragonList = action.payload;
      })
      .addCase(getDragonData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = dragonSlice.actions;
export default dragonSlice.reducer;
