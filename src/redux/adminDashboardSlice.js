import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const adminDashboardDeleteSubmissionsThunk = createAsyncThunk(
  "adminDashboardSlice/adminDashboardDeleteSubmissionsThunk",
  async (submissionsToBeDeleted) => {
      try{
        const obj = {
          jwtToken: localStorage.getItem("token"),
          submissionsToBeDeleted: submissionsToBeDeleted
        };
        return post("delete-submissions", obj).then((res) => {
          const obj = {
            data: res.data,
            error: res.error,
          };
          return obj;
        });
      }catch(err) {
        console.log(err);
      }
  }
)

const adminDashboardSlice = createSlice({
  name: "adminDashboardSlice",
  initialState: {
    status: STATUS.IDLE,
    errorMsg: null,
    successMsg: null,
  },
  reducers: {
    removeErrorStatusForAdminDashboard: (state, action) => {
      state.status = STATUS.IDLE;
    },
  },
  extraReducers: {
    [adminDashboardDeleteSubmissionsThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [adminDashboardDeleteSubmissionsThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
      }else{
        state.successMsg = data.message; 
        state.status = STATUS.SUCCESS;
      }
    },
    [adminDashboardDeleteSubmissionsThunk.rejected]: (state, action) => {},
  },
});

export const { removeErrorStatusForAdminDashboard } = adminDashboardSlice.actions;
export default adminDashboardSlice.reducer;