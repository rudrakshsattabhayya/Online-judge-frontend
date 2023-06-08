import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { get } from "../apis";
import STATUS from "../statuses";

export const problemTableThunk = createAsyncThunk(
  "dashboardSlice/problemTableThunk",
  async () => {
    try {
      return get("list-problems").then((res) => {
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

export const leaderBoardThunk = createAsyncThunk(
  "dashboardSlice/leaderBoardThunk",
  async () => {
    try {
      return get("get-leaderboard").then((res) => {
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

export const filterTagsThunk = createAsyncThunk(
    "dashboardSlice/filterTagsThunk",
    async () => {
      try {
        return get("list-tags").then((res) => {
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

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    status: STATUS.IDLE,
    problemsTable: {
      status: STATUS.IDLE,
      data: [],
    },
    leaderBoardTable: {
      status: STATUS.IDLE,
      data: []
    },
    filterTags: {
        status: STATUS.IDLE,
        data: []
    },
    errorMsg: null,
  },
  reducers: {
    removeErrorStatusForDashboard: (state, action) => {
        state.status = STATUS.IDLE;
      },
  },
  extraReducers: {
    [problemTableThunk.pending]: (state, action) => {
      state.problemsTable.status = STATUS.LOADING;
    },
    [problemTableThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
        state.problemsTable.status = STATUS.IDLE;
      } else {
        state.problemsTable.data = data.problems;
        state.problemsTable.status = STATUS.IDLE;
      }
    },
    [problemTableThunk.rejected]: (state, action) => {},

    [leaderBoardThunk.pending]: (state, action) => {
        state.leaderBoardTable.status = STATUS.LOADING;
      },
      [leaderBoardThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
          state.leaderBoardTable.status = STATUS.IDLE;
        } else {
          state.leaderBoardTable.data = data.response;
          state.leaderBoardTable.status = STATUS.IDLE;
        }
      },
      [leaderBoardThunk.rejected]: (state, action) => {},

      [filterTagsThunk.pending]: (state, action) => {
        state.filterTags.status = STATUS.LOADING;
      },
      [filterTagsThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
          state.filterTags.status = STATUS.IDLE;
        } else {
          state.filterTags.data = data.tags;
          state.filterTags.status = STATUS.IDLE;
        }
      },
      [filterTagsThunk.rejected]: (state, action) => {},
  },
});

export const { removeErrorStatusForDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
