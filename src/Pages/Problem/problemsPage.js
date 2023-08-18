import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  problemThunk,
  submitSolutionThunk,
  removeSuccessStatusFromSubmission,
  setSolutionNull
} from "../../redux/problemPageSlice";
import STATUS from "../../statuses";
import Loader from "../../Components/Loader/loader";
import "./problemPage.css";
import ProblemPageSidebar from "./Problem Sidebar/sidebar";

const ProblemPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { problemId } = useParams();
  const { status, submitSolutionStatus } = useSelector(
    (state) => state.problemPageState
  );
  const problem = useSelector((state) => state.problemPageState.problemsData);
  const {solution} = useSelector((state) => state.problemPageState);
  const [codeFile, setFile] = useState();
  useEffect(() => {
    dispatch(problemThunk(problemId));
  }, []);

  const submitSolution = () => {
    const formData = new FormData();
    formData.append("jwtToken", localStorage.getItem("token"));
    formData.append("questionId", problemId);
    formData.append("code", codeFile);

    dispatch(submitSolutionThunk(formData));
  };

  useEffect(() => {
    if(submitSolutionStatus === STATUS.SUCCESS){
        dispatch(removeSuccessStatusFromSubmission());
        navigate("/submissions");
    }
  }, [submitSolutionStatus]);

  useEffect(() => {
    if(solution != null){
      const link = process.env.REACT_APP_SUBMISSION_FILE_URL +  solution;
      dispatch(setSolutionNull());
      window.location.href = link;
    }
  }, [solution])

  return (
    <div id="problemsPageContainer">
      {submitSolutionStatus === STATUS.LOADING || status !== STATUS.IDLE || problem === null ? (
        <Loader />
      ) : (
        <div id="problemsPageContent">
          <div className="problemsPageContentItem" id="problemsPageInfo">
            <div id="problemsPageInfoHeading">
              <h1 style={{marginBottom: "6px"}}>{problem.title}</h1>
              <h4 style={{margin: "5px 0"}}>{`Difficulty: ${problem.difficulty}`}</h4>
              <h4 style={{margin: "5px 0"}}>{`Success Rate: ${problem.successRate}`}</h4>
            </div>
            <div id="problemsPageInfoContent">
              <h2>Problem Statement</h2>
              <p style={{textAlign: "justify"}} dangerouslySetInnerHTML={{ __html: problem.problemStatement }} />
            </div>
            <div id="problemsPageInfoInputs">
              <div className="problemsPageInfoInputsTitle">
                <p>Inputs</p>
              </div>
              <div className="problemsPageInfoInputsContent">
                <p style={{textAlign: "left", padding: "5px", marginTop: "0"}} dangerouslySetInnerHTML={{ __html: problem.visibleTestCases }} />
              </div>
            </div>
            <div id="problemsPageInfoOutputs">
              <div className="problemsPageInfoOutputsTitle">
                <p>Outputs</p>
              </div>
              <div className="problemsPageInfoOutputsContent">
                <p style={{textAlign: "left", padding: "5px", marginTop: "0"}} dangerouslySetInnerHTML={{ __html: problem.visibleOutputs }} />
              </div>
            </div>
          </div>
          <ProblemPageSidebar className="problemsPageContentItem" codeFile={codeFile} setFileForSubmit={setFile} submitSolution={submitSolution} />
        </div>
      )}
      {status === STATUS.ERROR && <Navigate to="/dashboard" />}
    </div>
  );
};

export default ProblemPage;
