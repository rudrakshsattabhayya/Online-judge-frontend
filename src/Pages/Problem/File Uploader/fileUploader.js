import React, {useState} from "react";

function FileUploader({setFileForSubmit }) {
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
    <div>
      <label htmlFor="file-input" style={{ display: "none" }}>
        Select a CPP file:
      </label>
      <input
        id="file-input"
        type="file"
        accept=".cpp"
        onChange={handleFileUpload}
        style={{ color: "transparent" }}
      />
      {file && (
        <div>
          <h4>File to be uploaded:</h4>
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

export default FileUploader;
