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
		{data?.descriptions && data?.descriptions?.map((description, index) => (
            <p key={index}>{description?.value}</p>
          ))}
    	<h3>CVSS V2 Metrics:</h3>
    	<div style={{display : "flex", flexDirection :"row"}}>
    		<div style={{display : "flex", flexDirection : "row"}}>
        		<h5 style={{paddingRight : "10px"}}>Severity:</h5>
				<p style={{paddingRight : "10px"}}>{data?.metrics?.cvssMetricV2[0]?.baseSeverity}</p>
        	</div>
        	<div style={{display : "flex", flexDirection : "row"}}>
        		<h5 style={{paddingRight : "10px"}}>Score</h5>
        		<p style={{paddingRight : "10px"}}>{data?.metrics?.cvssMetricV2[0]?.cvssData?.baseScore}</p>
        	</div>
      	</div>
      	<div style={{display : "flex", flexDirection : "row"}}>
    		<h5 style={{paddingRight : "10px"}}>Vector String</h5>
    		<p style={{paddingRight : "10px"}}>{data?.metrics?.cvssMetricV2[0]?.cvssData?.vectorString}</p>
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
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.accessVector}</td>
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.accessComplexity}</td>
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.authentication}</td>
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.confidentialityImpact}</td>
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.integrityImpact}</td>
					<td>{data?.metrics?.cvssMetricV2[0]?.cvssData?.availabilityImpact}</td>
				</tr>
			</tbody>
		</table>

		<h3>Scores</h3>
		<div style={{display : "flex", flexDirection : "row"}}>
			<h5 style={{paddingRight : "10px"}}>Exploiability Score</h5>
			<p style={{paddingRight : "10px"}}>{data?.metrics?.cvssMetricV2[0]?.exploitabilityScore}</p>
		</div>
		<div style={{display : "flex", flexDirection : "row"}}>
			<h5 style={{paddingRight : "10px"}}>Impact Score</h5>
			<p style={{paddingRight : "10px"}}>{data?.metrics?.cvssMetricV2[0]?.impactScore}</p>
		</div>

		<h3>CPE:</h3>
		<table style={{borderStyle : "solid"}}>
			<thead>
				<tr>
					<th>Criteria</th>
					<th>Match Criteria ID</th>
					<th>Vulnerable</th>
				</tr>
			</thead>
			<tbody>
				<tr>{/*
					<td>{data?.configurations[0]?.nodes[0]?.cpeMatch[0]?.criteria}</td>
					<td>{data?.configurations[0]?.nodes[0]?.cpeMatch[0]?.matchCriteriaId}</td>
					<td>{data?.configurations[0]?.nodes[0]?.cpeMatch[0]?.vulnerable}</td>*/}
				</tr>
			</tbody>	
		</table>

    </div>
  )
}

export default CVESInfo