import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeNewLoginStatus,removeErrorStatus} from "../../redux/loginPageSlice";
import {problemTableThunk, filterTagsThunk, leaderBoardThunk, removeErrorStatusForDashboard} from "../../redux/dashboardSlice";
import { openSnackBar } from "../../redux/snackBarSlice";
import STATUS from "../../statuses";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { newLoginStatus, status, errorMsg } = useSelector(
    (status) => status.login
  );
  const dashboardStatus = useSelector((status) => status.dashboardState.status);
  const dashboardErrorMsg = useSelector((status) => status.dashboardState.errorMsg)
  useEffect(() => {
    if (newLoginStatus) {
      const payload = {
        message: "Login Successfull!",
        type: "success",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeNewLoginStatus());
    }
  }, [newLoginStatus]);

  useEffect(() => {
    if (status === STATUS.ERROR) {
      const payload = {
        message: errorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatus());
    }
  }, [status]);

  useEffect(() => {
    if (dashboardStatus === STATUS.ERROR) {
      const payload = {
        message: dashboardErrorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForDashboard());
    }
  }, [dashboardStatus]);

  useEffect(() =>{
    dispatch(filterTagsThunk());
    dispatch(leaderBoardThunk());
    dispatch(problemTableThunk());
  }, []);

  
  return <>Dashboard</>;
};

export default Dashboard;
