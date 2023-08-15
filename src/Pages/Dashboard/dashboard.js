import "./dashboard.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeNewLoginStatus,removeErrorStatus} from "../../redux/loginPageSlice";
import {problemTableThunk, filterTagsThunk, leaderBoardThunk, removeErrorStatusForDashboard} from "../../redux/dashboardSlice";
import { openSnackBar } from "../../redux/snackBarSlice";
import { removeErrorStatusForProblemPage } from "../../redux/problemPageSlice";
import { removeErrorStatusForAdminAuth } from "../../redux/adminAuth";
import STATUS from "../../statuses";
import Loader from "../../Components/Loader/loader";
import Table from "../../Components/Table/table";
import Sidebar from "./Sidebar/sidebar";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { newLoginStatus, status, errorMsg } = useSelector(
    (status) => status.login
  );
  const dashboardStatus = useSelector((status) => status.dashboardState.status);
  const dashboardErrorMsg = useSelector((status) => status.dashboardState.errorMsg);
  const problemPageStatus = useSelector((status) => status.problemPageState.status);
  const problemPageErrorMsg = useSelector((status) => status.problemPageState.errorMsg);
  const adminAuthStatus = useSelector((status) => status.adminAuthState.status);
  const adminAuthErrorMsg = useSelector((status) => status.adminAuthState.errorMsg);

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
    if (problemPageStatus === STATUS.ERROR) {
      const payload = {
        message: problemPageErrorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForProblemPage());
    }
  }, [problemPageStatus]);

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

  useEffect(() => {
    if (adminAuthStatus === STATUS.ERROR) {
      const payload = {
        message: adminAuthErrorMsg,
        type: "warning",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForAdminAuth());
    }
  }, [adminAuthStatus]);

  useEffect(() =>{
    dispatch(filterTagsThunk());
    dispatch(leaderBoardThunk());
    dispatch(problemTableThunk());
  }, []);

  
  return (<>
  {dashboardStatus !== STATUS.IDLE?<Loader />:
  <div id="dashboardContainer">
  <div id="dashboardContent">
    <Table className="dashboardContentItem dashboardContentTable" tableHeading="Problems" />
    <Sidebar className="dashboardContentItem"/>
  </div>
  </div>
  }
  </>);
};

export default Dashboard;
