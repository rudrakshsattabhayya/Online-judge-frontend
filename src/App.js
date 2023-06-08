import React, {useState, useEffect} from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authRouteThunk } from "./redux/loginPageSlice";
import Navbar from "./Components/Navbar/navbar";
import Loader from "./Components/Loader/loader";
import Dashboard from "./Pages/Dashboard/dashboard";
import LoginPage from "./Pages/Login/loginPage";
import SubmissionPage from "./Pages/Submissions/submissionsPage";
import STATUS from "./statuses";
import SnackbarComponent from "./Components/Snackbar/snackBar";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((status) => status.login);
  useEffect(() => {
    dispatch(authRouteThunk());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
      {isAuthenticated === STATUS.LOADING? <Loader />:
        <Router>
          <Routes>
            <Route element={!isAuthenticated?<LoginPage />:<Navigate to="/dashboard" />} path="/" exact />
            <Route element={isAuthenticated?<Dashboard />:<Navigate to="/" />} path="/dashboard" exact />
            <Route element={isAuthenticated?<SubmissionPage />:<Navigate to="/" />} path="/submissions" exact />
          </Routes>
        </Router>}
        <SnackbarComponent />
    </div>
  );
}

export default App;
