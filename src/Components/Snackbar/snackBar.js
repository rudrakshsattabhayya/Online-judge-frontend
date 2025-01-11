import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackBar } from "../../redux/snackBarSlice";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      autohideduration={6000}
      ref={ref}
      variant="filled"
      {...props}
    />
  );
});

const SnackbarComponent = () => {
  const dispatch = useDispatch();
  const { visible, type, message } = useSelector(
    (status) => status.snackBarState
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(closeSnackBar());
  };
  return (
    <Snackbar open={visible} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message || "Something went wrong!"}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
