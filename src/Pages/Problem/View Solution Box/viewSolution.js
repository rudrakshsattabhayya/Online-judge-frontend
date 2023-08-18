import "./viewSolution.css";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { showProblemSolutionThunk } from "../../../redux/problemPageSlice";
import { useParams } from "react-router-dom";

const ViewSolutionBox = () => {
    const dispatch = useDispatch();
    const { problemId } = useParams();
    const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleGoAhead = () => {
    dispatch(showProblemSolutionThunk(problemId));
  }

  return (
    <div className="ViewSolutionContainer">
      <div className="ViewSolutionTitle">
        <p>Correct Solution</p>
      </div>
      <Button onClick={handleClickOpen} style={{marginTop: "10px", marginBottom: "10px", backgroundColor: "#010820dd", width: "50%"}} variant="contained">View Solution</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            After you view the solution, this problem won't be counted for your leaderboard score.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleGoAhead} autoFocus>
            Go Ahead
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSolutionBox;
