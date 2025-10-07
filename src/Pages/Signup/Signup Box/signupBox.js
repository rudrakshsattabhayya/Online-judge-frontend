import "./signupBox.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithPasswordThunk } from "../../../redux/loginPageSlice";

const SignUpBox = () => {
  console.log("signup box");
  const dispatch = useDispatch();
  const [email, updateEmail] = useState("");
  const [username, updateUsername] = useState("");
  const [name, updateName] = useState("");
  const [useremail, updateUseremail] = useState("");

  const handleUseremailChange = (event) => {
    updateUseremail(event.target.value);
  };

  const handleEmailChange = (event) => {
    updateEmail(event.target.value);
  };
  const handleUsernameChange = (event) => {
    updateUsername(event.target.value);
  };
  const handleNameChange = (event) => {
    updateName(event.target.value);
  };

  const handleSubmit = () => {
    const data = {
      email: email,
      name: name,
      username: username,
    };
    dispatch(signInWithPasswordThunk(data));
  };
  return (
    <div className="form-container">
      <p className="title">Signup</p>
      <div className="form" style={{ paddingRight: "42px" }}>
        <div style={{ opacity: "1" }} className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder=""
            required
          />
        </div>
        <div className="input-group" style={{ opacity: "1" }}>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
            placeholder=""
          />
        </div>
        <div className="input-group" style={{ opacity: "1" }}>
          <label htmlFor="name">Name</label>
          <input
            type="name"
            name="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
            placeholder=""
          />
        </div>
        <button
          className="sign"
          style={{ opacity: "1", marginLeft: "27px", marginTop: "15px", cursor: "pointer" }}
          onClick={handleSubmit}
          type="submit"
        >
          Sign in
        </button>
      </div>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with Email</p>
        <div className="line"></div>
      </div>
      <div style={{ opacity: "1" }} className="input-group2">
          <label htmlFor="useremail">Email</label>
          <input
            type="text"
            name="useremail"
            id="useremail"
            value={useremail}
            onChange={handleUseremailChange}
            placeholder=""
            required
          />
        </div>
    </div>
  );
};

export default SignUpBox;
