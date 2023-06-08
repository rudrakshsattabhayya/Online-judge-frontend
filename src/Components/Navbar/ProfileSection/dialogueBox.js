import * as React from 'react';
import { useEffect} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
// import { useDispatch, useSelector } from "react-redux";
import {getTypeOfFormThunk} from "../../redux/formRelatedSlice";
import { useNavigate } from 'react-router-dom';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(getTypeOfFormThunk());
  // }, []);
  // const {typesOfFormStatus, typesOfForms} = useSelector((state) => state.formRelatedSlice); 
  
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (item) => {
    handleClose();
    navigate('fill-a-form/' + item.formID+"?req=new");
    window.location.reload();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Fill A Form</DialogTitle>
      <List sx={{ pt: 0 }}>
        {/* {typesOfForms.map((item) => (
          <ListItem disableGutters key={item.formID}>
            <ListItemButton onClick={() => handleListItemClick(item)} key={item.formID}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Dialog>
  );
}

export default SimpleDialog;