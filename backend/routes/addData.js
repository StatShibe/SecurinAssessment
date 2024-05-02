const CVSEData = require("../model/CVESDetails");
const connectDB = require("../config/DBConnect");

const perPage = 1000; // Adjust the number of results per page
let startIndex = 0;
const totalResults = 247505; // Total number of results from the API

const handleDBInsert = async () => {
    try {
        await connectDB();
        
        while (startIndex < totalResults) {
            const url = `https://services.nvd.nist.gov/rest/json/cves/2.0/?resultsPerPage=${perPage}&startIndex=${startIndex}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error(`Invalid content type. Expected JSON, got ${contentType}`);
            }
            
            const data = await response.json();
            const vulnerabilities = data.vulnerabilities;
            const cveData = vulnerabilities.map(vulnerability => vulnerability.cve);
            await CVSEData.insertMany(cveData);
            startIndex += perPage;
        }
        
        console.log("Data inserted successfully");
    } catch (err) {
        console.error("Error inserting data:", err);
    }
}

handleDBInsert();
