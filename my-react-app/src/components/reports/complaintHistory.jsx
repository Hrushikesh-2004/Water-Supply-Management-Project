import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useTable, useGlobalFilter} from 'react-table';

const ComplaintsHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:5001/reports/getComHistory");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching complaints:',error);
                setData([]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const convertToIST = (utcTimeStamp) => {
      const date = new Date(utcTimeStamp);
      const istDate = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Kolkata'}).format(date);
      return istDate;

    }

    const columns = React.useMemo(() => [
        {Header:'Name', accessor: 'name'},
        {Header:'CAN ID', accessor: 'canId'},
        {Header:'Email', accessor: 'email'},
        {Header:'Mobile', accessor: 'mobile'},
        {Header:'Subject', accessor: 'subject'},
        {Header:'Description', accessor: 'description'},
        {Header:'Resolved', accessor: 'resolved'},
        {Header:'Created On', accessor: 'createdAt', Cell: ({value})=> convertToIST(value)},
        {Header:'Resolved On', accessor: 'updatedAt', Cell: ({value})=> convertToIST(value)},
    ], []);


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state: { globalFilter }, setGlobalFilter} = useTable({columns, data}, useGlobalFilter);

    return (
        <div className="com-container">
          <h2 className="com-heading">Complaints History</h2>
          {!loading && (
            <div className='report-react-table'>
              <input
                type="text"
                placeholder="Search..."
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
              <table {...getTableProps()} className="com-table">
                <thead>
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()} className="com-list-item">
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {loading && <p>Loading...</p>}
          {!loading && data.length === 0 && <p>No accepted connections available</p>}
        </div>
      );
}

export default ComplaintsHistory;