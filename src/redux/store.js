import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginPageSlice";
import snackBarReducer from "./snackBarSlice";
import dashboardReducer from "./dashboardSlice";
import submissionReducer from "./submissionPageSlice";
import problemPageReducer from "./problemPageSlice";
import adminAuthReducer from "./adminAuth";
import adminDashboardReducer from "./adminDashboardSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    snackBarState: snackBarReducer,
    dashboardState: dashboardReducer,
    submissionPageState: submissionReducer,
    problemPageState: problemPageReducer,
    adminAuthState: adminAuthReducer,
    adminDashboardState: adminDashboardReducer,
  },
});