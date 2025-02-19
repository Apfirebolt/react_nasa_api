import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import landingPadService from "./landingPadService";

const initialState = {
  landingPadList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple landing pad records
export const getLandingPadData = createAsyncThunk(
  "landingPad/getLandingPadData",
  async (_, thunkAPI) => {
    try {
      return await landingPadService.getLandingPads();
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

export const landingPadSlice = createSlice({
  name: "landingPad",
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
      .addCase(getLandingPadData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLandingPadData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.landingPadList = action.payload;
      })
      .addCase(getLandingPadData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = landingPadSlice.actions;
export default landingPadSlice.reducer;
