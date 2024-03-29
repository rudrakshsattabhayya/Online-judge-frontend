import React from "react";
import "./loaderStyles.css";

const Loader = (props) => {
  return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
  );
};

export default Loader;