import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import missionService from "./missionService";

const initialState = {
  missionList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Multiple missions
export const getMissionData = createAsyncThunk(
  "mission/getMissionData",
  async (_, thunkAPI) => {
    try {
      return await missionService.getMissions();
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

export const missionSlice = createSlice({
  name: "mission",
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
      .addCase(getMissionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMissionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missionList = action.payload;
      })
      .addCase(getMissionData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, resetVariables } = missionSlice.actions;
export default missionSlice.reducer;
