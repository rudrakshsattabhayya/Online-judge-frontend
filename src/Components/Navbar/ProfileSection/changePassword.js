import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { changePasswordThunk } from "../../../redux/navbar";
import STATUS from "../../../statuses";
import { openSnackBar } from "../../../redux/snackBarSlice";
import { makeStatusIdle } from "../../../redux/navbar";

const ChangePassword = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [textFieldValue, setTextFieldValue] = useState("");
  const [textFieldError, setTextFieldError] = useState(false);
  const { status, msg } = useSelector((status) => status.navbar);

  const handleSubmit = () => {
    if (textFieldValue.trim() === "") {
      setTextFieldError(true);
    } else {
      const obj = {
        password: textFieldValue,
      };
      setTextFieldValue("");
      dispatch(changePasswordThunk(obj));
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
      dispatch(makeStatusIdle());
    }
  }, [status]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`Please type your password below`}
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Password"
          type="password"
          fullWidth
          variant="standard"
          value={textFieldValue}
          onChange={handleTextFieldChange}
          helperText={textFieldError ? "Password cannot be empty" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePassword;
