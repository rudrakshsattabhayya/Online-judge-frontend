import PreviousSubmssionsBox from "../Previous Submissions/previousSubmssions";
import FileUploader from "../File Uploader/fileUploader";
import "./sidebar.css";
import ViewSolutionBox from "../View Solution Box/viewSolution";

const ProblemPageSidebar = ({className, codeFile, setFileForSubmit, submitSolution}) => {
    return (
        <div className={className} id="problemsPageSidebarContainer">
            <PreviousSubmssionsBox />
            <FileUploader codeFile={codeFile} setFileForSubmit={setFileForSubmit} submitSolution={submitSolution} />
            <ViewSolutionBox />
        </div>
    )
}

export default ProblemPageSidebar;