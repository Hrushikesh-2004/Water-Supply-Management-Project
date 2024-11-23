import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable, useGlobalFilter } from 'react-table';

const ConnectionsHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToIST = (utcTimeStamp) => {
    if(utcTimeStamp == null){
      return null;
    }
    const date = new Date(utcTimeStamp);
    const istDate = new Intl.DateTimeFormat('en-US', {timeZone: 'Asia/Kolkata'}).format(date);
    return istDate;

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/connection/acceptedconnectionslist');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accepted connections:', error);
        setData([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(()=>[
    { Header: 'Name', accessor: 'name' },
    { Header: 'Address', accessor: 'address' },
    { Header: 'City', accessor: 'city' },
    { Header: 'Pincode', accessor: 'pincode' },
    { Header: 'Can', accessor: 'can' },
    { Header: 'Connections Approved On', accessor: 'createdAt', Cell:({value}) => convertToIST(value) },
  ], []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);

  return (
    <div className="ac-container">
      <h2 className="ac-heading">Household Water Connection Data</h2>
      {!loading && (
        <div className='report-react-table'>
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
          <table {...getTableProps()} className="ac-table">
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
                  <tr {...row.getRowProps()} className="ac-list-item">
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
};

export default ConnectionsHistory;