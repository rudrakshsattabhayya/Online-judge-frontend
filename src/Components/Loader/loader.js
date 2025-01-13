import React, { useState, useEffect } from "react";
import "./loaderStyles.css";

const Loader = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="spinner-container">
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
      <div className="spinner-text">Loading...</div>
      {showMessage && (
        <div className="loader-message">
          This may take up to a minute as the server is deployed on a free instance on render.com
        </div>
      )}
    </div>
  );
};

export default Loader;
