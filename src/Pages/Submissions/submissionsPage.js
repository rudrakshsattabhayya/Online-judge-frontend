import React, {useState, useEffect} from "react";
import { openSnackBar } from "../../redux/snackBarSlice";
import STATUS from "../../statuses";
import { useSelector, useDispatch } from "react-redux";
import { removeErrorStatusForSubmissionPage } from "../../redux/submissionPageSlice";
import { submissionsThunk } from "../../redux/submissionPageSlice";
import convertDateFormat from "./getTime";
import Table from "../../Components/Table/table";
import Loader from "../../Components/Loader/loader";
import "./submissions.css"

const SubmissionPage = () => {
    const dispatch = useDispatch();
    const {status, errorMsg, data} = useSelector((state) => state.submissionPageState);
    const [submissions, updateSubmissions] = useState([]);
    const headingRowInfo = [
      {
        id: 1,
        title: "Sr No",
        tdKeyName: "index",
        width: "10%"
      },
      {
        id: 2,
        title: "Problem",
        tdKeyName: "problemTitle",
        width: "40%"
      },
      {
        id: 3,
        title: "User",
        tdKeyName: "user",
        width: "15%"
      },
      {
        id: 4,
        title: "Verdict",
        tdKeyName: "verdict",
        width: "10%",
      },
      {
        id: 5,
        title: "Code",
        tdKeyName: "code",
        width: "10%"
      },
      {
        id: 6,
        title: "Time",
        tdKeyName: "time",
        width: "15%"
      }
    ];

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
        dispatch(submissionsThunk());
      }, []);

      useEffect(() => {
        let arr = [];
        let reverseData = [...data];
        reverseData.reverse()
        reverseData.forEach((submission, index) => {
          let verdict = submission.status;
          if(submission.status === "Processed"){
            verdict = "False";
            if(submission.verdict) {
              verdict = "True";
            }
          }
          const obj = {
            index: index+1,
            problemId: submission.problem.id,
            problemTitle: submission.problem.title,
            user: submission.user,
            code: process.env.REACT_APP_SUBMISSION_FILE_URL+submission.code,
            time: convertDateFormat(submission.time),
            verdict: verdict
          }
          arr.push(obj);
        });
        updateSubmissions(arr);
      }, [data])

    return(
      <div id="submissionContainer">
      <div id="submissionHeading">Submissions</div>
      {status !== STATUS.IDLE?<Loader />:
        <Table className="" tableHeading="Submissions" headingRowInfo={headingRowInfo} trInfo={submissions} />}
      </div>
    )
}

export default SubmissionPage;