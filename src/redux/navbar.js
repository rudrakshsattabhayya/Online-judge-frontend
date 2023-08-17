import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const changeUsernameThunk = createAsyncThunk(
  "navbarSlice/changeUsernameThunk",
  async (obj) => {
      try{
        return post("change-username", obj).then((res) => {
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

export const changePasswordThunk = createAsyncThunk(
    "navbarSlice/changePasswordThunk",
    async (obj) => {
        try{
          return post("change-the-password", obj).then((res) => {
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
  

const navbarSlice = createSlice({
  name: "navbarSlice",
  initialState: {
    status: STATUS.IDLE,
    msg: null,
    newUsername: null
  },
  reducers: {
    makeStatusIdle: (state, action) => {
        state.status = STATUS.IDLE;
    }
  },
  extraReducers: {
    [changeUsernameThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [changeUsernameThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.msg = data.message;
        state.status = STATUS.ERROR;
      } else {
        state.msg = data.message;
        state.status = STATUS.SUCCESS;
        state.newUsername = data.username;
      }
    },
    [changeUsernameThunk.rejected]: (state, action) => {},

    [changePasswordThunk.pending]: (state, action) => {
        state.status = STATUS.LOADING;
      },
      [changePasswordThunk.fulfilled]: (state, action) => {
        const { error, data } = action.payload;
        if (error) {
          state.msg = data.message;
          state.status = STATUS.ERROR;
        } else {
          state.msg = data.message;
          state.status = STATUS.SUCCESS;
        }
      },
      [changePasswordThunk.rejected]: (state, action) => {},
  },
});

export const { makeStatusIdle } = navbarSlice.actions;
export default navbarSlice.reducer;