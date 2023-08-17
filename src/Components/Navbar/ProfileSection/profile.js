import React, {useState} from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from "react-redux";
import ChangeUsername from "./changeUsername";
import ChangePassword from "./changePassword";
import { useNavigate } from "react-router";

const Profile = () => {
  let navigate = useNavigate();
  let proxyProfilPic = `${process.env.REACT_APP_FRONTEND_URL}/proxyForProfilePic.jpg`;
  let profilePhotoSrc = localStorage.getItem("profilePic");
  let {isAuthenticated} = useSelector((status) => status.login);

  const handleImageError = (event) => {
    event.target.src = proxyProfilPic;
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    window.location.reload();
  };

  const handleGotodashboard= () => {
    handleClose();
    navigate("/dashboard");
  }

  const handleGotosubmissions = () => {
    handleClose();
    navigate("/submissions");
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  //username change
  const [openUsernameDialogue, setUsernameDialogue] = useState(false);
  const handleUsernameDialogueClose = () => {
    setUsernameDialogue(false);
  }
  const handleUsernameDialogueOpen = () => {
    handleClose();
    setUsernameDialogue(true);
  }

  //password change
  const [openPasswordDialogue, setPasswordialogue] = useState(false);
  const handlePasswordDialogueClose = () => {
    setPasswordialogue(false);
  }
  const handlePasswordDialogueOpen = () => {
    handleClose();
    setPasswordialogue(true);
  }


  return (
    <div style={{ position: "absolute", right: "15px", borderRadius: "100px" }}>
          {isAuthenticated &&
          <img
            src={profilePhotoSrc}
            alt="pic"
            width="40"
            height="40"
            onError={handleImageError}
            style={{borderRadius: "1rem", cursor: "pointer"}}
            onClick={handleClick}
          />}
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleUsernameDialogueOpen}>Change Username</MenuItem>
        <MenuItem onClick={handlePasswordDialogueOpen}>Change Password</MenuItem>
        <MenuItem onClick={handleGotodashboard}>Go to Dashboard</MenuItem>
        <MenuItem onClick={handleGotosubmissions}>Go to Submissions</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <ChangeUsername 
        open={openUsernameDialogue}
        handleClose={handleUsernameDialogueClose}
       />
       <ChangePassword 
        open={openPasswordDialogue}
        handleClose={handlePasswordDialogueClose}
       />
    </div>
  );
};

export default Profile;
