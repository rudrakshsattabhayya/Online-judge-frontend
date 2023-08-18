import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import STATUS from "../../statuses";
import { Navigate } from "react-router-dom";
import { adminAuthRouteThunk } from "../../redux/adminAuth";

const AddProblem = () => {
    const dispatch = useDispatch();
    const {status} = useSelector((state) => state.adminAuthState);
    useEffect(() => {
        dispatch(adminAuthRouteThunk());
      }, []);
      
    return(<>
        <div>Add Problem Page</div>
        {status===STATUS.ERROR && <Navigate to="/dashboard" />}
    </>)
}

export default AddProblem;