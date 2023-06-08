import ThreeBar from "./ThreeBar/threeBar";
import "./navbar.css";
import Profile from "./ProfileSection/profile";


export default function Navbar() {

  return (
    <div className="navbar">
      {<ThreeBar />}
      <div className="logo">{"</> OnlineJudge"}</div>
      <Profile />
    </div>
  );
}
