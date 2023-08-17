import "./navbar.css";
import Profile from "./ProfileSection/profile";
import { useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/dashboard");
  }
  return (
    <div className="navbar">
      <div className="logo" style={{cursor: "pointer"}} onClick={handleLogoClick}>{"</> OnlineJudge"}</div>
      <Profile />
    </div>
  );
}
