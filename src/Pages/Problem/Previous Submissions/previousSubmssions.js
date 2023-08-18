import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader/loader";
import STATUS from "../../../statuses";
import "./previousSubmission.css"
import Pagination from "@mui/material/Pagination";

const PreviousSubmssionsBox = () => {
  const perPageCount = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const problemPageStatus = useSelector((status) => status.problemPageState.status); 
  const data = useSelector((status) => status.problemPageState.data); 
  const [trInfo, updateTrInfo] = useState([]);

  useEffect(() => {
    if(data !== null){
        const userSubmissions = data.userSubmissions;
        let arr = [];
        const options = {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata'
        };
          
        userSubmissions.forEach((sub, index) => {
            const obj = {
                index: index + 1,
                ...sub
            }
            if(obj.verdict){
                obj.verdict = "True";
            }else{
                obj.verdict = "False";
            }
            const dateObj = new Date(obj.time);
            const formattedDate = dateObj.toLocaleDateString('en-IN', options);
            obj.time = formattedDate;
            arr.push(obj);
        });
        updateTrInfo(arr);
    }
  }, [data]);

  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  }

  return (
    <div className="previousSubmissionsContainer">
    <div className="previousSubmissionsTitle">
        <p>Previous Submissions</p>
    </div>
    <div className="previousSubmissionsTable">
    {problemPageStatus !== STATUS.IDLE? <Loader />:<>
          {trInfo.map((row, index) => {
            if(index+1>perPageCount*(currentPage-1) && index+1 <= perPageCount*currentPage){
            return (
              <div className="previousSubmissionsTr" key={index}>
                    <div
                      className="previousSubmissionsTd"
                      style={{ flexBasis: "15%" }}
                    >
                      {index+1}
                    </div>
                    <div
                      className="previousSubmissionsTd"
                      style={{ flexBasis: "60%", textAlign: "left", padding: "0 5px" }}
                    >
                        <a href={process.env.REACT_APP_SUBMISSION_FILE_URL+row.code}>{row.time}</a> 
                    </div>
                    <div
                      className="previousSubmissionsTd"
                      style={{ flexBasis: "25%", padding: "0 5px" }}
                    >
                      {row.verdict}
                    </div>
              </div>
            );}
          })}</>}
          <div className="previousSubmissionsTr" style={{ justifyContent: "center" }}>
            <Pagination
              className="pagination"
              count={parseInt((trInfo.length - 1) / perPageCount + 1)}
              shape="rounded"
              page={currentPage}
              onChange={handlePaginationChange}
            />
        </div>
        </div>
    </div>
  );
};

export default PreviousSubmssionsBox;
