import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./Components/Navbar/navbar";
import Dashboard from "./Pages/Dashboard/dashboard";
import LoginPage from "./Pages/Login/loginPage";
import SubmissionPage from "./Pages/Submissions/submissionsPage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />
      </header>
        <Router>
          <Routes>
            <Route element={<LoginPage />} path="/" exact />
            <Route element={<Dashboard />} path="/dashboard" exact />
            <Route element={<SubmissionPage />} path="/submissions" exact />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
