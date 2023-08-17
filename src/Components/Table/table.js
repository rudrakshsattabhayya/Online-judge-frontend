import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./table.css";
import Pagination from "@mui/material/Pagination";

const Table = ({ className, tableHeading, trInfo, headingRowInfo }) => {
  const navigate = useNavigate();
  const perPageCount = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationChange = (event, page) => {
    setCurrentPage(page);
  }

  const handleClick = (event) => {
    if(event.target.id){
      navigate(`/problem/${event.target.id}`);
    }
  }
  
  return (
    <div id="tableContainer" className={className}>
      <div className="table">
        <div className="thead">
          <div className="tr">
            {headingRowInfo.map((col) => {
              return (
                <div
                  className="th"
                  key={col.id}
                  style={{ flexBasis: col.width }}
                >
                  {col.title}
                </div>
              );
            })}
          </div>
        </div>
        <div className="tbody">
          {trInfo.map((row, index) => {
            if(row.index>perPageCount*(currentPage-1) && row.index <= perPageCount*currentPage)
            return (
              <div className="tr problemRow" id={row.problemId} key={index} onClick={handleClick}>
                {headingRowInfo.map((col) => {
                  return (
                    <div
                      className="td"
                      key={col.id}
                      style={{ flexBasis: col.width }}
                      id={row.problemId}
                    >
                      {col.tdKeyName !== "code"?row[col.tdKeyName]:(<a href={row.code}>Code</a>)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div className="tfoot">
          <div className="tr" style={{ justifyContent: "center" }}>
            <Pagination
              className="pagination"
              count={parseInt((trInfo.length - 1) / perPageCount + 1)}
              shape="rounded"
              page={currentPage}
              onChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
