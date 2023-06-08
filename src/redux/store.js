import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginPageSlice";
import snackBarReducer from "./snackBarSlice";
import dashboardReducer from "./dashboardSlice";
import submissionReducer from "./submissionPageSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBarState: snackBarReducer,
    dashboardState: dashboardReducer,
    submissionPageState: submissionReducer,
  },
});