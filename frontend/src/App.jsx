import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(100); // Number of records per page
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data whenever currentPage changes

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3500/getdata?page=${currentPage}&pageSize=${pageSize}`,{
        method : "GET"
      });
      const data = await response.json();
      const cveData = data.data;
      console.log(data.totalCount)
      setData(cveData);
      setTotalPages(Math.ceil(data.totalCount / pageSize));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{height : "100vh", width : "100%"}}>
      <table>
        {/* Render table headers */}
        <thead>
          <tr>
            <th>ID</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        {/* Render table body */}
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {/* Render additional table cells */}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination controls */}
      <div style={{backgroundColor : "red", height : "50px", width : "100px"}}>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button key={index + 1} onClick={() => handlePageChange(index + 1)} style={{borderColor : "black"}}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App
