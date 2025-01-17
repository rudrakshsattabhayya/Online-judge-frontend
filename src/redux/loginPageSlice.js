import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { post } from "../apis";
import STATUS from "../statuses";
import axios from "axios";

export const googleLoginThunk = createAsyncThunk(
  "loginSlice/googleLoginThunk",
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

export const signInWithPasswordThunk = createAsyncThunk(
  "loginSlice/signInWithPasswordThunk",
  async (data) => {
    try {
      return post("login-with-password", data).then((res) => {
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

export const authRouteThunk = createAsyncThunk(
  "loginSlice/authRouteThunk",
  async () => {
      try{
        const obj = {
          token: localStorage.getItem("token")
        };
        return post("auth-route", obj).then((res) => {
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

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    status: STATUS.IDLE,
    newLoginStatus: false,
    data: {
      name: null,
      email: null,
      profilePic: null,
      token: null,
      username: null,
    },
    isAuthenticated: STATUS.LOADING,
    errorMsg: null,
  },
  reducers: {
    removeErrorStatus: (state, action) => {
      state.status = STATUS.IDLE;
    },
    removeNewLoginStatus: (state, action) => {
      state.newLoginStatus = false;
    },
    changeUsernameReducer: (state, action) => {
      state.data.username = action.payload;
      console.log("cru")
    }
  },
  extraReducers: {
    [googleLoginThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [googleLoginThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
      } else {
        state.data.email = data.email;
        state.data.name = data.name;
        state.data.profilePic = data.profilePic;
        console.log(state.data.profilePic)
        state.newLoginStatus = true;
        localStorage.setItem('token',data.jwtToken)
        axios.defaults.headers.common['Authorization'] = `Bearer ${data.jwtToken}`;
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('profilePic', data.profilePic);
        state.status = STATUS.IDLE;
        state.isAuthenticated = true
      }
    },
    [googleLoginThunk.rejected]: (state, action) => {},


    [signInWithPasswordThunk.pending]: (state, action) => {
      state.status = STATUS.LOADING;
    },
    [signInWithPasswordThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
      } else {
        state.data.email = data.email;
        state.data.name = data.name;
        state.data.profilePic = data.profilePic;
        state.newLoginStatus = true;
        localStorage.setItem('token',data.jwtToken)
        localStorage.setItem('email', data.email);
        localStorage.setItem('name', data.name);
        localStorage.setItem('profilePic', data.profilePic);
        state.status = STATUS.IDLE;
        state.isAuthenticated = true
      }
    },
    [signInWithPasswordThunk.rejected]: (state, action) => {},


    [authRouteThunk.pending]: (state, action) => {
      state.isAuthenticated = STATUS.LOADING;
    },
    [authRouteThunk.fulfilled]: (state, action) => {
      const { error, data } = action.payload;
      if (error) {
        state.errorMsg = data.message;
        state.status = STATUS.ERROR;
        state.isAuthenticated = false;
      } else {
        if(data.status === 200){
          state.isAuthenticated = true;
          state.data.name = data.name;
          state.data.email = data.email;
          state.data.username = data.username;
          state.data.profilePic = data.profilePic;
        }else{
          state.isAuthenticated = false;
        } 
      }
    },
    [authRouteThunk.rejected]: (state, action) => {},
  },
});

export const { removeErrorStatus, removeNewLoginStatus, changeUsernameReducer } = loginSlice.actions;
export default loginSlice.reducer;