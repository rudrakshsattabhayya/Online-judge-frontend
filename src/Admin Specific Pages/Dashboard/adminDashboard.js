import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { removeErrorStatusForSubmissionPage } from "../../redux/submissionPageSlice";
import { submissionsThunk, deleteSelectedSubmissionsReducer } from "../../redux/submissionPageSlice";
import { adminAuthRouteThunk } from "../../redux/adminAuth";
import { adminDashboardDeleteSubmissionsThunk, removeErrorStatusForAdminDashboard } from "../../redux/adminDashboardSlice";
import { openSnackBar } from "../../redux/snackBarSlice";
import STATUS from "../../statuses";
import Loader from "../../Components/Loader/loader";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.adminAuthState);
  const dashboardDataStatus = useSelector((status) => status.submissionPageState.status);
  const dashboardDataErrorMsg = useSelector((status) => status.submissionPageState.errorMsg);
  const adminDashboardStatus = useSelector((status) => status.adminDashboardState.status);
  const adminDashboardSuccessMsg = useSelector((status) => status.adminDashboardState.successMsg);

  const [submissionsToBeDeleted, updateSubmissionsToBeDeleted] = useState(["118","120"]);

  useEffect(() => {
    dispatch(adminAuthRouteThunk());
  }, []);

  useEffect(() => {
    if (dashboardDataStatus === STATUS.ERROR) {
      const payload = {
        message: dashboardDataErrorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForSubmissionPage());
    }
  }, [dashboardDataStatus]);

  useEffect(() =>{
    dispatch(submissionsThunk());
  }, []);

  useEffect(() =>{
    if(adminDashboardStatus === STATUS.SUCCESS){
      if(adminDashboardSuccessMsg === "Selected submissions are deleted!"){
        const payload = {
          message: adminDashboardSuccessMsg,
          type: "success"
        }
        dispatch(openSnackBar(payload));
        dispatch(deleteSelectedSubmissionsReducer(submissionsToBeDeleted));
        dispatch(removeErrorStatusForAdminDashboard());
      }
    }
  },[adminDashboardStatus]);


  const deleteSubmisions = () => {
    dispatch(adminDashboardDeleteSubmissionsThunk(submissionsToBeDeleted));
  }

  
  return (
    <>
  {adminDashboardStatus !== STATUS.IDLE? <Loader />:
  <div>Admin Dashboard
  {status===STATUS.ERROR && <Navigate to="/dashboard" />}
  <button onClick={deleteSubmisions}>Delete submissions</button>
  </div>}</>);
};

export default AdminDashboard;
