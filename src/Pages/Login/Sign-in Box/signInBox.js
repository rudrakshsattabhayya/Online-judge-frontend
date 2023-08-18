import "./signInBox.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signInWithPasswordThunk } from "../../../redux/loginPageSlice";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const SignInBox = ({ responseGoogle }) => {
  const dispatch = useDispatch();
  const [email, updateEmail] = useState("");
  const [password, updatePassword] = useState("");

  const handleEmailChange = (event) => {
    updateEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    updatePassword(event.target.value);
  };
  const handleSubmit = () => {
    const data = {
      email: email,
      password: password,
    };
    dispatch(signInWithPasswordThunk(data));
  };
  return (
    <div className="form-container">
      <p className="title">Login</p>
      <div className="form" style={{ paddingRight: "48px" }}>
        <div style={{ opacity: "1" }} className="input-group">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            name="username"
            id="username"
            value={email}
            onChange={handleEmailChange}
            placeholder=""
            required
          />
        </div>
        <div className="input-group" style={{ opacity: "1" }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            placeholder=""
          />
          <div className="forgot" style={{ cursor: "pointer" }}>
            Forgot Password ?
          </div>
        </div>
        <button
          className="sign"
          style={{ opacity: "1", marginLeft: "27px", cursor: "pointer" }}
          onClick={handleSubmit}
          type="submit"
        >
          Sign in
        </button>
      </div>
      <div className="social-message">
        <div className="line"></div>
        <p className="message">Login with Google</p>
        <div className="line"></div>
      </div>
      <div className="social-icons">
        <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
          <GoogleLogin
            aria-label="Log in with Google"
            className="icon"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy="single_host_origin"
          ></GoogleLogin>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default SignInBox;
