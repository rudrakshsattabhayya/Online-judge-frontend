import React, {useState} from "react";

function FileUploaderButton({setFileForSubmit }) {
  const [file, setFile] = useState(null);
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.name.endsWith(".cpp")) {
      setFile(selectedFile);
      setFileForSubmit(selectedFile);
    } else {
      setFile(null);
      setFileForSubmit(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div id="fileUploaderButtonContainer">
      <label htmlFor="file-input">
        Select a CPP file:
      </label>
      <input
        id="file-input"
        type="file"
        accept=".cpp"
        onChange={handleFileUpload}
        style={{ color: "transparent", maxWidth: "90px", paddingLeft: "5px" }}
      />
      {file && (
        <div>
          <h4 style={{marginBottom: "5px"}}>File to be Submitted:</h4>
              <a
                href={URL.createObjectURL(file)}
                target="_blank"
                rel="noreferrer"
              >
                {file.name}
              </a>
              <button
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "#DF2E38",
                  color: "white",
                  height: "1rem",
                  width: "1rem",
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.7rem",
                  position: "relative",
                  marginLeft: "10px",
                }}
                onClick={handleRemoveFile}
              >
                x
              </button>
        </div>
      )}
    </div>
  );
}

export default FileUploaderButton;
