import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const problemThunk = createAsyncThunk(
    "problemPageSlice/problemThunk",
    async (problemId) => {
      try {
        const data = {
          jwtToken: localStorage.getItem("token"),
          questionId: problemId
        };
  
        return post("show-problem", data).then((res) => {
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

export const showProblemSolutionThunk = createAsyncThunk(
    "problemPageSlice/showProblemSolutionThunk",
    async (problemId) => {
      try {
        const data = {
          jwtToken: localStorage.getItem("token"),
          questionId: problemId
        };
  
        return post("show-problem-solution", data).then((res) => {
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

  export const submitSolutionThunk = createAsyncThunk(
    "problemPageSlice/submitSolutionThunk",
    async (data) => {
      try {
        return post("submit-problem", data).then((res) => {
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

const problemPageSlice = createSlice({
  name: "problemPageSlice",
  initialState: {
    status: STATUS.IDLE,
    submitSolutionStatus: STATUS.IDLE,
    submissionMessage: null,
    data: null,
    errorMsg: null,
    solution: null,
  },
  reducers: {
    removeErrorStatusForProblemPage: (state, action) => {
        state.status = STATUS.IDLE;
      },
  },
  extraReducers: {
    
    [problemThunk.pending]: (state, action) => {
        state.status = STATUS.LOADING;
      },
      [problemThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.data = data.response;
          state.status = STATUS.IDLE;
        }
      },
      [problemThunk.rejected]: (state, action) => {},

      [showProblemSolutionThunk.pending]: (state, action) => {
        state.status = STATUS.LOADING;
      },
      [showProblemSolutionThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.solution = data.solution;
          state.status = STATUS.IDLE;
        }
      },
      [showProblemSolutionThunk.rejected]: (state, action) => {},

      [submitSolutionThunk.pending]: (state, action) => {
        state.submitSolutionStatus = STATUS.LOADING;
      },
      [submitSolutionThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.submitSolutionStatus = STATUS.ERROR;
        } else {
          state.submissionMessage = data.verdict;
          state.submitSolutionStatus = STATUS.IDLE;
        }
      },
      [submitSolutionThunk.rejected]: (state, action) => {},

      },
      
});

export const { removeErrorStatusForProblemPage } = problemPageSlice.actions;
export default problemPageSlice.reducer;
