import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Sidebar from "../Sidebar/sidebar";
import CloseIcon from "@mui/icons-material/Close";

const Drawer = ({ state, toggleDrawer, setState }) => {
    const handleClose = () => {
        setState(false);
    }
  return (
    <SwipeableDrawer
      anchor="left"
      open={state}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <CloseIcon onClick={handleClose} />
      <Sidebar />
    </SwipeableDrawer>
  );
};

export default Drawer;
