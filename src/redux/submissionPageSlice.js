import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const submissionsThunk = createAsyncThunk(
    "submissionPageSlice/submissionsThunk",
    async () => {
      try {
        const data = {
          jwtToken: localStorage.getItem("token"),
        };
  
        return post("list-submissions", data).then((res) => {
          const obj = {
            data: res.data,
            error: res.error,
          };
          return obj;
        });
      } catch (err) {
        console.log(err);
      }
    }
  );

const submissionPageSlice = createSlice({
  name: "submissionPageSlice",
  initialState: {
    status: STATUS.IDLE,
    data: [],
    errorMsg: null,
  },
  reducers: {
    removeErrorStatusForSubmissionPage: (state, action) => {
        state.status = STATUS.IDLE;
      },
  },
  extraReducers: {
    
    [submissionsThunk.pending]: (state, action) => {
        state.status = STATUS.LOADING;
      },
      [submissionsThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.data = data.submissions;
          state.status = STATUS.IDLE;
        }
      },
      [submissionsThunk.rejected]: (state, action) => {},
      },
      
});

export const { removeErrorStatusForSubmissionPage } = submissionPageSlice.actions;
export default submissionPageSlice.reducer;
