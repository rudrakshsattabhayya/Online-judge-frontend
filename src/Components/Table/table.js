import "./table.css";

const Table = ({className, tableHeading}) => {
    return (
        <div id="tableContainer" className={className}>
            <div className="container" style={{paddingTop: "100px", paddingBottom: "100px"}}>

<div>
  <div>
    <div className="table-card">
      <div className="header">
        <span className="title">{tableHeading}</span>
      </div>
      <div className="table">
        <table className="bordered">
          <thead>
            <tr>
              <th>Transação</th>
              <th>Host</th>
              <th>Erro</th>
              <th>#</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>POST /fwlink/?LinkID=109572&clcid=0x409</td>
              <td>go.microsoft.com</td>
              <td>400</td>
              <td>10</td>
            </tr>

            <tr>
              <td>GET /chrome/profile_avatars/NothingToDownload</td>
              <td>www.gstatic.com</td>
              <td>404</td>
              <td>1</td>
            </tr>

            <tr>
              <td>GET /chrome/profile_avatars/NothingToDownload</td>
              <td>www.gstatic.com</td>
              <td>404</td>
              <td>1</td>
            </tr>

            <tr>
              <td>GET /chrome/profile_avatars/NothingToDownload</td>
              <td>www.gstatic.com</td>
              <td>404</td>
              <td>1</td>
            </tr>

            <tr>
              <td>GET /chrome/profile_avatars/NothingToDownload</td>
              <td>www.gstatic.com</td>
              <td>404</td>
              <td>1</td>
            </tr>

            <tr>
              <td>GET /chrome/profile_avatars/NothingToDownload</td>
              <td>www.gstatic.com</td>
              <td>404</td>
              <td>1</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div className="footer">
        Footer
      </div>

    </div>
  </div>
</div>

</div>
        </div>
    )
}

export default Table;