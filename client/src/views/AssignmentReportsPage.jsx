import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';

const AssignmentReportsPage = () => {
	//data state variable is used for displaying the report data gathered from an assignment
	const [data,setData] = useState([]);

	//assignmentId state variable is used for user input for which assignment to look at.
    const [assignmentId, setAssignmentId] = useState("");

	//courseId state variable is used for setting which course to look under for the assignment.
	const [courseId, setCourseId] = useState("");
	
	//reportType state variable is used to configure which report the user should recieve to view
    const [reportType, setReportType] = useState("pageViews");

	//reportPage state variable is used to see the multiple pages of a report if it allows multiple pages
	const [reportPage, setReportPage] = useState("");

	//Custom onChange method for assignment input box
	const handleAssignmentChange = (event) => {
		setAssignmentId(event.target.value);

	};

	//Custom onChange method for course input box
	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}
	
	//Custom onChange method for the reportType dropdown
	const handleReportPageChange = (event) => {
		setReportPage(event.target.value);
	}

	//ReportTypeDropDown custom component for seeing the different types of reports <utilizes @Prime-React>
    const ReportTypeDropDown = () => {
        return(
			<Dropdown data-testid="dropTest" id="reportTypeDropdown" value={reportType}  onChange={(e) => setReportType(e.value)} options={['pageViews', 'studentActivity', 'grades']} 
			placeholder="Select a report" className="w-full md:w-14rem" />
		)
    }

	//timeConvertor for turning the returned seconds count to a reader viewable format: (hh, mm, ss)
	const timeConvertor = (time_string) => {
		let hours = Math.floor(time_string / 3600);
		let minutes = Math.floor((time_string - (hours * 3600)) / 60);
		let seconds = time_string - (hours * 3600) - (minutes * 60);
		return(hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds");
	}

	/**
	 * ReportInfoDisplay custom component used for displaying the different types of reportTypes
	 * Utilizes reportType state variable to determine what the reportType that should be displayed
	 * @returns The react component for showing the desired reportType format
	 */
	const ReportInfoDisplay = () => {
		switch (reportType) {
			case "pageViews":
				if(data !== undefined){
				return (
					<>
						{(data.length > 0) ?
						data.map((page) => {
							return(
								<>
									<li>Page ID: {page._id} / Page Views: {page.views} / Average Interaction Time: {timeConvertor(Math.floor(page.averageTime))}</li>
								</>
							)
						})
						:
						<label>No page analytics to display</label>}
					</>
				);
				}
				else{
					return(
						<>
							<li></li>
						</>
					);
				}
			case "studentActivity":
				const rows = [];
				for(var id in data) {
					rows.push({'id': id, 'readingTime': data[id].readingTime, 'viewingTime': data[id].viewingTime,
						'numAnnotations': data[id].numAnnotations, 'totalWordCount': data[id].totalWordCount});
				}
				return(
					<>
						{
							(rows.length > 0) ? 
							rows.map((row) => {
								return(
									<>
										<li>Student ID: {row.id} / Reading Time: {timeConvertor(Math.floor(row.readingTime))} / Viewing Time: {timeConvertor(Math.floor(row.viewingTime))} / Number of Annotations: {row.numAnnotations}</li>
									</>
								)
							})
							: 
							<label>No student activity to display</label>
						}
					</>
				);
			default:
				if(data !== undefined){
				return(
					<>
						{(data.length > 0) ?
						data.map((grades) => {
							return(
								<>
									<li>Grade ID: {grades._id} / Student ID: {grades.userId} / Score: {grades.score}</li>
								</>
							)
						})
						:
						<label>No grades to display</label>}
					</>
				);
				} else{
					return(
						<>
							<li></li>
						</>
					);
				}
		}
	}

	/**
	 * useEffect will get the assignments report data only when the the courseId, assignmentId, and reportPage have valid inputs
	 * Will reload page when reportType, reportPage, assignmentId, or courseId are updated
	 */
	useEffect(() => {
        if (courseId !== "" && assignmentId !=="" && reportPage !== "") {
			console.log("reportType: "+ reportType);
            axios.post('/api/assignment_analytics', {'_CID': courseId, '_AID': assignmentId, '_REP': reportType, '_P': reportPage})
			.then(response => {
				console.log(response);
				if(reportType === "grades"){
					console.log("GRADES")
					setData(response.data.grades);
					console.log(response.data.grades);
				}
				else {
					console.log("REPORT")
					setData(response.data.report);
					console.log(response.data.report);
				}
			})
			.catch(error => {
				console.error(error);
				setData([]);
			});
        }
	}, [reportType, reportPage, courseId, assignmentId]); //[x,...] updates page if values x,... changes, if empty it only updates on entry to the page



	return (
        (
            <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
				<div>
					<label> Enter the course id:
						<input style={{'margin': '0 1rem 0 0'}} placeholder='Course Id Here' type='text' onChange={handleCourseChange}/>
					</label>
					<label> Enter the assignment id:
						<input type='text' placeholder='Assignment Id Here' onChange={handleAssignmentChange}/>
					</label>
				</div>
				<span />
				<div>
					<label> Select the report type: 
							<ReportTypeDropDown />
					</label>
					<label style={{'margin': '0 0 0 1rem'}}> Enter the report page:
						<input type='text' placeholder='Report Page Here' onChange={handleReportPageChange}/>
					</label>
				</div>
				<label>
						Current report type: {reportType}
				</label>
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignment Analytics:</h1>
				<ReportInfoDisplay />
			</div>
        )
	)
}

export default AssignmentReportsPage;