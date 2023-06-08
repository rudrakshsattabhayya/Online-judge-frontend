import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import SimpleDialog from "./dialogueBox";


const Profile = ({ options }) => {
  let proxyProfilPic = "http://localhost:3000/proxyForProfilePic.jpg";
  let profilePhotoSrc = localStorage.getItem("profilePic");

  const handleImageError = (event) => {
    event.target.src = proxyProfilPic;
  };

  const handleLogout = async () => {
    try {
    //   await deleteApi("logout").then((res) => {
    //     if (res.data === "Success") {
    //       window.location.reload();
    //     }
    //   });
    } catch (err) {
      console.log(err);
    }
  };

  const [modalOpen, setOpen] = React.useState(false);
  const [modalSelectedValue, setSelectedValue] = React.useState();

  const modalHandleClickOpen = () => {
    setOpen(true);
  };

  const modalHandleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ position: "absolute", right: "15px", borderRadius: "100px" }}>
      {/* <Dropdown>
        <Dropdown.Toggle */}
          {/* variant="primary"
          id="dropdown-basic"
          style={{ backgroundColor: "#29335c" }}
        > */}
          <img
            src={profilePhotoSrc}
            alt="pic"
            width="40"
            height="40"
            onError={handleImageError}
            style={{borderRadius: "1rem"}}
          />
        {/* </Dropdown.Toggle> */}
        {/* <Dropdown.Menu>
          <Dropdown.Item onClick={modalHandleClickOpen}>Fill A Form</Dropdown.Item>
          <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
        </Dropdown.Menu> */}
      {/* </Dropdown> */}
      {/* <SimpleDialog
        selectedValue={modalSelectedValue}
        open={modalOpen}
        onClose={modalHandleClose}
      /> */}
    </div>
  );
};

export default Profile;
