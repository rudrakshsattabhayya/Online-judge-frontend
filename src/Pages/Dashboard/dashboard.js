import "./dashboard.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {removeNewLoginStatus,removeErrorStatus} from "../../redux/loginPageSlice";
import {problemTableThunk, filterTagsThunk, leaderBoardThunk, removeErrorStatusForDashboard} from "../../redux/dashboardSlice";
import { openSnackBar } from "../../redux/snackBarSlice";
import { removeErrorStatusForProblemPage } from "../../redux/problemPageSlice";
import { removeErrorStatusForAdminAuth } from "../../redux/adminAuth";
import STATUS from "../../statuses";
import Loader from "../../Components/Loader/loader";
import Table from "../../Components/Table/table";
import Sidebar from "./Sidebar/sidebar";
import Drawer from "./Drawer/drawer";
import MenuIcon from '@mui/icons-material/Menu';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { newLoginStatus, status, errorMsg } = useSelector(
    (status) => status.login
  );
  const dashboardStatus = useSelector((status) => status.dashboardState.status);
  const dashboardErrorMsg = useSelector((status) => status.dashboardState.errorMsg);
  const problemPageStatus = useSelector((status) => status.problemPageState.status);
  const problemPageErrorMsg = useSelector((status) => status.problemPageState.errorMsg);
  const adminAuthStatus = useSelector((status) => status.adminAuthState.status);
  const adminAuthErrorMsg = useSelector((status) => status.adminAuthState.errorMsg);
  const problemsState = useSelector((status) => status.dashboardState.problemsTable); 
  const filterValues = useSelector((status) => status.dashboardState.filterValues);

  const [problems, updateProblems] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const headingRowInfo = [{
    id: 1,
    title: "Sr No",
    tdKeyName: "index",
    width: "10%",
  },
  {
    id: 2,
    title: "Problems",
    tdKeyName: "title",
    width: "50%",
  },
  {
    id: 3,
    title: "Difficulty Level",
    tdKeyName: "difficulty",
    width: "15%",
  },
  {
    id: 4,
    title: "No of submissions",
    tdKeyName: "totalSubmissions",
    width: "15%",
  },
  {
    id: 5,
    title: "Success Rate",
    tdKeyName: "successRate",
    width: "10%",
  }
]

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (newLoginStatus) {
      const payload = {
        message: "Login Successfull!",
        type: "success",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeNewLoginStatus());
    }
  }, [newLoginStatus]);

  useEffect(() => {
    if (status === STATUS.ERROR) {
      const payload = {
        message: errorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatus());
    }
  }, [status]);

  useEffect(() => {
    if (problemPageStatus === STATUS.ERROR) {
      const payload = {
        message: problemPageErrorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForProblemPage());
    }
  }, [problemPageStatus]);

  useEffect(() => {
    if (dashboardStatus === STATUS.ERROR) {
      const payload = {
        message: dashboardErrorMsg,
        type: "error",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForDashboard());
    }
  }, [dashboardStatus]);

  useEffect(() => {
    if (adminAuthStatus === STATUS.ERROR) {
      const payload = {
        message: adminAuthErrorMsg,
        type: "warning",
      };
      dispatch(openSnackBar(payload));
      dispatch(removeErrorStatusForAdminAuth());
    }
  }, [adminAuthStatus]);

  useEffect(() =>{
    dispatch(filterTagsThunk());
    dispatch(leaderBoardThunk());
    dispatch(problemTableThunk());
  }, []);

  useEffect(() => {
    let arr = [];

    let filteredProblemsState = problemsState.data;

    if(filterValues.difficulty > 0){
      filteredProblemsState = filteredProblemsState.filter((elem) => elem.difficulty === filterValues.difficulty);
    }else{
      filteredProblemsState = problemsState.data;
    }
    
    if(filterValues.tags.length>0){
      filteredProblemsState = filteredProblemsState.filter((elem) => {
        const filterTags = filterValues.tags;
        const elemTags = elem.tags;
        for(let i=0;i<filterTags.length;i++){
          if(elemTags.includes(filterTags[i])){
            return true;
          }
        }
      })
    }


    filteredProblemsState.forEach((obj, index) => {
      let successRate = "0%";
      if(obj.totalSubmissions !== 0){
        const rate = parseInt(100*(obj.acceptedSubmissions/obj.totalSubmissions));
        successRate = `${rate}%`;
      }
      let difficulty = "Easy";
      if (obj.difficulty === 2) difficulty = "Medium";
      if (obj.difficulty === 3) difficulty = "Hard";
      const probObj = {
        problemId: obj.id,
        index: index+1,
        title: obj.title,
        totalSubmissions: obj.totalSubmissions,
        successRate: successRate,
        difficulty: difficulty
      };
      arr.push(probObj);
    });

    updateProblems(arr);
  },[problemsState, filterValues])

  //Drawer
  const [drawerState, setDrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };
  const handleMenuIcon = () => {
    setDrawerState(true);
  }

  
  return (<>
  {dashboardStatus !== STATUS.IDLE?<Loader />:
  <div id="dashboardContainer">
  <div id="dasboardHeading">
  {screenWidth <= 900 && <MenuIcon id="dashboardMenuIcon" onClick={handleMenuIcon} />}
    <p>Dashboard</p>
  </div>
  <div id="dashboardContent">
    <Table className="dashboardContentItem dashboardContentTable" tableHeading="Problems" headingRowInfo={headingRowInfo} trInfo={problems} />
    {screenWidth > 900 && <Sidebar className="dashboardContentItem"/>}
  </div>
  {screenWidth <= 900 && <Drawer state={drawerState} toggleDrawer={toggleDrawer} setState={setDrawerState} />}
  </div>
  }
  </>);
};

export default Dashboard;
