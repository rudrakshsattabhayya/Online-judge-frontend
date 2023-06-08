import React, {useState, useEffect} from "react";
import { openSnackBar } from "../../redux/snackBarSlice";
import STATUS from "../../statuses";
import { useSelector, useDispatch } from "react-redux";
import { removeErrorStatusForSubmissionPage } from "../../redux/submissionPageSlice";
import { submissionsThunk } from "../../redux/submissionPageSlice";

const SubmissionPage = () => {
    const dispatch = useDispatch();
    const {status, errorMsg} = useSelector((state) => state.submissionPageState);

    useEffect(() => {
        if (status === STATUS.ERROR) {
          const payload = {
            message: errorMsg,
            type: "error",
          };
          dispatch(openSnackBar(payload));
          dispatch(removeErrorStatusForSubmissionPage());
        }
      }, [status]);

      useEffect(() => {
        console.log("useffect")
        dispatch(submissionsThunk());
      }, []);


    return(<>
        SubmissionPage
    </>)
}

export default SubmissionPage;