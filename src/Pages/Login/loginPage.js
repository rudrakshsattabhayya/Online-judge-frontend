import React, { useState } from "react";
import SignInBox from "./Sign-in Box/signInBox";

const LoginPage = () => {
  return (
    <div
      style={{
        marginTop: "5rem",
        display: "inline-block",
        alignItems: "center",
      }}
    >
      <SignInBox />
    </div>
  );
};

export default LoginPage;
