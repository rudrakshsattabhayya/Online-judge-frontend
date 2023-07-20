import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SignInBox from "./Sign-in Box/signInBox";
import { googleLoginThunk, removeErrorStatus } from "../../redux/loginPageSlice";
import { openSnackBar } from "../../redux/snackBarSlice";
import STATUS from "../../statuses";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMsg } = useSelector((status) => status.login);

  useEffect(() => {
    if(status === STATUS.ERROR){
      const payload = {
        message: errorMsg,
        type: "error"
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatus());
    }
  }, [status])

  const responseGoogle = async (res) => {
    try {
      const jwtToken = res.credential;
      dispatch(googleLoginThunk(jwtToken));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      style={{
        marginTop: "5rem",
        display: "inline-block",
        alignItems: "center",
      }}
    >
    <button onClick={responseGoogle}>sign-In</button>
      <SignInBox responseGoogle={responseGoogle} />
    </div>
  );
};

export default LoginPage;
