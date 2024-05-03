import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../assets/styles/cvesListStyling.css"

const CVESList = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10); // Number of records per page
    const [totalPages, setTotalPages] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [currentPage, pageSize]); // Fetch data whenever currentPage changes
    
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3500/getdata?page=${currentPage}&pageSize=${pageSize}`,{
                method: "GET"
            });
            const responseData = await response.json();
            const cveData = responseData.data;
            setData(cveData);
            setTotalCount(responseData.totalCount);
            setTotalPages(Math.ceil(responseData.totalCount / pageSize));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(1); // Reset currentPage when page size changes
    };

    return (
        <div className='cvelist'>
            <h1>CVE LIST</h1>
            <h3 style={{textAlign: "left"}}>Total records: {totalCount}</h3>
            <table style={{borderStyle: "solid", borderColor: "black", height: "fit-content", width: "100%"}}>
                <thead>
                    <tr>
                        <th scope='col'>CVE ID</th>
                        <th scope='col'>IDENTIFIER</th>
                        <th scope='col'>PUBLISHED DATE</th>
                        <th scope='col'>LAST MODIFIED DATE</th>
                        <th scope='col'>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>
                                <Link to={`/cves/${item.id}`}>{item.id}</Link>
                            </td>
                            <td>{item.sourceIdentifier}</td>
                            <td>{item.published}</td>
                            <td>{item.lastModified}</td>
                            <td>{item.vulnStatus}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                        </td>
                        <td colSpan="2">
                            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            Page {currentPage} of {totalPages}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div>
                <label htmlFor="pageSize">Page Size:</label>
                <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
                </select>
            </div>
        </div>
    )
}

export default CVESList;
