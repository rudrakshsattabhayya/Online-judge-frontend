import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";

export const adminAuthRouteThunk = createAsyncThunk(
  "adminAuthSlice/adminAuthRouteThunk",
  async () => {
      try{
        const obj = {
          token: localStorage.getItem("token")
        };
        return post("auth-route-admin", obj).then((res) => {
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

const adminAuthSlice = createSlice({
  name: "adminAuthSlice",
  initialState: {
    status: STATUS.IDLE,
    isAdmin: false,
    errorMsg: null,
  },
  reducers: {
    removeErrorStatusForAdminAuth: (state, action) => {
      state.status = STATUS.IDLE;
    }
  },
  extraReducers: {
    [adminAuthRouteThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [adminAuthRouteThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
        state.isAdmin = false;
      } else {
        if(data.status === 200){
          state.isAdmin = true;
        }else{
          state.isAdmin = false;
          state.errorMsg = data.message;
          state.status = STATUS.ERROR;
        } 
      }
    },
    [adminAuthRouteThunk.rejected]: (state, action) => {},
  },
});

export const { removeErrorStatusForAdminAuth } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;