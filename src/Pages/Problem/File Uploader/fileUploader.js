import "./fileUploader.css";
import FileUploaderButton from "./fileUploaderButton";
import Button from '@mui/material/Button';

const FileUploader = ({setFileForSubmit, submitSolution, codeFile}) => {
  return (
    <div className="fileUploaderContainer">
      <div className="fileUploaderTitle">
        <p>Submit your Solutions</p>
      </div>
        <div className="fileUploaderContent">
            <FileUploaderButton setFileForSubmit={setFileForSubmit} />
            {codeFile && <Button onClick={submitSolution} style={{marginTop: "10px", backgroundColor: "#010820dd", width: "50%"}} variant="contained">Submit</Button>}
        </div>
    </div>
  );
};

export default FileUploader;
