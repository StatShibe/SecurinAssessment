import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

const CVESInfo = () => {

    const {cvesid} = useParams();
	const [data, setData] = useState([]);
	useEffect(() => {
        fetchData();
    }, []);
	
	const fetchData = async() => {
		try{
			const response = await fetch(`http://localhost:3500/getcve/${cvesid}`,{
                method : "GET"
            });

			const data = await response.json();
			setData(data)
			console.log(data)
		}
		catch(err){
			console.log(err);
		}
	}
    
	return (
    <div>
    	<h1>{cvesid}</h1>
    	<h3>Description</h3>
		{data.descriptions && data.descriptions.map((description, index) => (
            <p key={index}>{description.value}</p>
          ))}
    	<h3>CVSS V2 Metrics:</h3>
    	<div style={{display : "flex", flexDirection : "col"}}>
    		<div style={{display : "flex", flexDirection : "row"}}>
        		<h5>Severity:</h5>
				{data.metrics && data.metrics.map((metrics, index) => (
            		<p key={index}>{metrics.cvssMetricV2[0].baseSeverity}</p>
         		 ))}
        	</div>
        	<div style={{display : "flex", flexDirection : "row"}}>
        		<h5>Score</h5>
        		<p>score here</p>
        	</div>
      	</div>
      	<div style={{display : "flex", flexDirection : "row"}}>
    		<h5>Vector String</h5>
    		<p>vector string here</p>
      	</div>

		<table style={{borderStyle : "solid"}}>
			<thead>
				<tr>
					<th>Access Vector</th>
					<th>Access Complexity</th>
					<th>Authentication</th>
					<th>Confidentiality Impact</th>
					<th>Integrity Impact</th>
					<th>Availability Impact</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
					<td>4</td>
					<td>5</td>
					<td>6</td>
				</tr>
			</tbody>
		</table>

		<h3>Scores</h3>
		<div style={{display : "flex", flexDirection : "row"}}>
			<h5>Exploiability Score</h5>
			<p>exploiabilty score here</p>
		</div>
		<div style={{display : "flex", flexDirection : "row"}}>
			<h5>Impact Score</h5>
			<p>Impact score here</p>
		</div>

		<h3>CPE:</h3>
		<table style={{borderStyle : "solid"}}>
			<thead>
				<tr>
					<th>Criteria</th>
					<th>Match Criteria ID</th>
					<th>Vulnarable</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>1</td>
					<td>2</td>
					<td>3</td>
				</tr>
			</tbody>
		</table>

    </div>
  )
}

export default CVESInfo