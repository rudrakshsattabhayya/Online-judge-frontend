import {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { problemThunk, showProblemSolutionThunk, submitSolutionThunk } from "../../redux/problemPageSlice";
import STATUS from "../../statuses";
import FileUploader from "./File Uploader/fileUploader";
import Loader from "../../Components/Loader/loader";


const ProblemPage = () => {
    const dispatch = useDispatch();
    const { problemId } = useParams();
    const {status, submitSolutionStatus} = useSelector((state) => state.problemPageState);
    const [codeFile, setFile] = useState();
    useEffect(() => {
        dispatch(problemThunk(problemId));
    }, []);

    const showProblemSolution = () => {
        dispatch(showProblemSolutionThunk(problemId));
    }

    const submitSolution = () => {
        const formData = new FormData();
        formData.append("jwtToken", localStorage.getItem("token"));
        formData.append("questionId", problemId);
        formData.append("code", codeFile);

        dispatch(submitSolutionThunk(formData));
    }

    return (<div>
    ProblemPage: {problemId}
    {/* Add warning if viewed no points */}
    <button onClick={showProblemSolution}>View Solution</button>
    {/* For Submission Box */}
    {submitSolutionStatus!== STATUS.IDLE? <Loader />: <div>
      <label>Upload Files:</label>
      <FileUploader setFileForSubmit={setFile}/>
      <button onClick={submitSolution}>Submit</button>
    </div>}
    {status === STATUS.ERROR && <Navigate to="/dashboard" />}
    </div>);
  };
  
  export default ProblemPage;
  