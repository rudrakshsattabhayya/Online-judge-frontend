import "./sidebar.css";
import Leaderboard from "./Leaderboard/leaderboard";
import Filterbox from "./FilterBox/filterbox";

const Sidebar = ({className}) => {
    return (
        <div id="sidebarContainer" className={className}>
            <Filterbox />
            <Leaderboard />
        </div>

    )
}

export default Sidebar;