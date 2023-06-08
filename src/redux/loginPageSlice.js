import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import { STATUS } from "./statuses";

export const authThunk = createAsyncThunk(
  "authSlice/authThunk",
  async (jwtToken) => {
    try {
      const data = {
        jwtToken: jwtToken,
      };

      return post("login", data).then((res) => {
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

// export const logoutThunk = createAsyncThunk(
//   "authSlice/logoutThunk",
//   async () => {
//     try {
//       return deleteApi("logout").then((res) => {
//         const obj = {
//           data: res.data,
//           error: res.error,
//         };
//         return obj;
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   }
// ); 

export const authRouteThunk = createAsyncThunk(
  "authSlice/authRouteThunk",
  async () => {
      try{
        return post("auth-route",{}).then((res) => {
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

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    status: STATUS.IDLE,
    data: {
      name: null,
      email: null,
      profilePic: null,
    },
    authenticatedStatus: STATUS.IDLE,
    errorMsg: null,
    snackBarStatus: false,
  },
  reducers: {
    closeSnackBar: (state, action) => {
        state.snackBarStatus = false;
    }
  },
  extraReducers: {
    [authRouteThunk.pending]: (state, action) => {
      state.authenticatedStatus = STATUS.LOADING;
    },
    [authRouteThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data;
        state.authenticatedStatus = false;
      } else {
        if(data === "User is Authenticated!"){
          state.authenticatedStatus = true;
        }else{
          state.authenticatedStatus = false;
        }
      }
    },
    [authThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [authThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        if(data === "User is not registerd!"){
          state.errorMsg = "It seems that you are not registered to this portal. Please contact the Admin!";
          state.snackBarStatus = true;
        }
        state.status = STATUS.ERROR;
      } else {
        state.data.email = data.email;
        state.data.name = data.name;
        state.data.profilePic = data.profilePic;
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('profilePic', data.profilePic);
        state.status = STATUS.SUCCESS;
      }
    },
    [authThunk.rejected]: (state, action) => {},
  },
});

export default authSlice.reducer;
export const {closeSnackBar} = authSlice.actions;