import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../Components/Loader/loader";
import STATUS from "../../../../statuses";
import "./leaderboard.css";

const Leaderboard = () => {
  const perPageCount = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const leaderboardStatus = useSelector(
    (status) => status.dashboardState.leaderBoardTable.status
  );
  const leaderboardData = useSelector(
    (status) => status.dashboardState.leaderBoardTable.data
  );
  const [trInfo, updateTrInfo] = useState([]);

  useEffect(() => {
    let filteredData = [...leaderboardData].sort(
      (a, b) => b.leaderBoardScore - a.leaderBoardScore
    );
    updateTrInfo(filteredData);
  }, [leaderboardData]);

  return (
    <div className="leaderboardContainer">
      <div className="leaderboardTitle">
        <p>Leaderboard</p>
      </div>
      <div className="leaderboardTable">
        {leaderboardStatus !== STATUS.IDLE ? (
          <Loader />
        ) : (
          <>
            {trInfo.map((row, index) => {
              if (
                index + 1 > perPageCount * (currentPage - 1) &&
                index + 1 <= perPageCount * currentPage
              ) {
                return (
                  <div className="leaderboardTr" id={row.id} key={row.id}>
                    <div className="leaderBoardTd" style={{ flexBasis: "20%" }}>
                      {index + 1}
                    </div>
                    <div
                      className="leaderBoardTd"
                      style={{
                        flexBasis: "50%",
                        textAlign: "left",
                        padding: "0 5px",
                      }}
                    >
                      {row.username}
                    </div>
                    <div
                      className="leaderBoardTd"
                      style={{ flexBasis: "30%", padding: "0 5px" }}
                    >
                      {row.leaderBoardScore}
                    </div>
                  </div>
                );
              }
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
