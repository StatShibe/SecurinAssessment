import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom'
import "../assets/styles/cvesListStyling.css"

const CVESList = () => {
    

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
        } 
        catch (error) {
            console.error('Error fetching data:', error);
        }
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };


    return (

        <div className='cvelist'>
            <h1>CVE LIST</h1>
            <h3 style={{textAlign : "left"}}>Total records</h3>

            <table style={{borderStyle : "solid", borderColor : "black", height : "fit-content", width : "100%"}}>
                <thead>
                    <tr>
                        <th scope='col'>CVE ID</th>
                        <th scope='col'>IDENTIFIER</th>
                        <th scope ='col'>PUBLISHED DATE</th>
                        <th scope='col'>LAST MODIFIED DATE</th>
                        <th scope='col'>STATUS</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <Link to = {`/cves/${item.id}`}>
                                <td>{item.id}</td>
                                </Link>
                                <td>{item.sourceIdentifier}</td>
                                <td>{item.published}</td>
                                <td>{item.lastModified}</td>
                                <td>{item.vulnStatus}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td><button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button></td>
                        <td><button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default CVESList