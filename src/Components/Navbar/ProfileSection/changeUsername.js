import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changeUsernameThunk } from "../../../redux/navbar";
import STATUS from "../../../statuses";
import { openSnackBar } from "../../../redux/snackBarSlice";
import { makeStatusIdle } from "../../../redux/navbar";
import { changeUsernameReducer } from "../../../redux/loginPageSlice";

const ChangeUsername = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textFieldError, setTextFieldError] = useState(false);
  const { username } = useSelector((status) => status.login.data);
  const { status, msg, newUsername } = useSelector((status) => status.navbar);

  const handleSubmit = () => {
    if (textFieldValue.trim() === "") {
      setTextFieldError(true);
    } else {
      const obj = {
        newUserName: textFieldValue,
      };
      setTextFieldValue("");
      dispatch(changeUsernameThunk(obj));
      handleClose();
    }
  };
  const handleTextFieldChange = (event) => {
    const inputValue = event.target.value;
    if (!inputValue.includes(" ")) {
      setTextFieldValue(inputValue);
      setTextFieldError(false);
    }
  };

  useEffect(() => {
    if (status === STATUS.ERROR) {
      const payload = {
        message: msg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(makeStatusIdle());
    }
    if (status === STATUS.SUCCESS) {
      const payload = {
        message: msg,
        type: "success",
      };
      dispatch(openSnackBar(payload));
      dispatch(changeUsernameReducer(newUsername));
      dispatch(makeStatusIdle());
    }
  }, [status]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Username</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Your current username is ${username}.`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="New Username"
          type="text"
          fullWidth
          variant="standard"
          value={textFieldValue}
          onChange={handleTextFieldChange}
          helperText={textFieldError ? "Text cannot be empty" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangeUsername;
