import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';

const AssignmentReportsPage = () => {
	const [data,setData] = useState([]);
    const [assignmentId, setAssignmentId] = useState("");
	const [courseId, setCourseId] = useState("");
    const [reportType, setReportType] = useState("");//pageViews or grades is also irrelavent
	//KNOWN ISSUE if report type is set to currently selected report type it will NOT Change if reselected even if other fields are changed
	//possible fix is if you also include the other fields in the useEffect update []

	const [reportPage, setReportPage] = useState("");
	const [search, setSearch] = useState(false);

	const [courseUpdated, setCourseUpdated] = useState(courseId);
    const [assignmentUpdated, setAssignmentUpdated] = useState(assignmentId);

	const [reportPageUpdated, setReportPageUpdated] = useState(reportPage);

	const handleAssignmentChange = (event) => {
		setAssignmentId(event.target.value);
	};

	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}

	const handleReportPageChange = (event) => {
		setReportPage(event.target.value);
	}

	const handleClick = () => {
		setAssignmentUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setCourseUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
		setReportPageUpdated(prevReportPage => prevReportPage !== reportPage ? reportPage : prevReportPage);
		setSearch(!search);
	};

    const dateTimeParser = (time_string) => {
		let date = new Date( Date.parse(time_string) );
		const options = { 
			year: 'numeric', 
			month: 'long', 
			day: 'numeric', 
			hour: '2-digit', 
			minute: '2-digit', 
			second: '2-digit', 
			timeZoneName: 'short' 
		  };
		return date.toLocaleDateString('en-US', options);
	}

    const ReportTypeDropDown = () => {
        return(
			<Dropdown id="reportTypeDropdown" value={reportType} onChange={(e) => setReportType(e.value)} options={['pageViews', 'studentActivity', 'grades']} 
			placeholder="Select a report" className="w-full md:w-14rem" />
		)
    }

	const timeConvertor = (time_string) => {
		let hours = Math.floor(time_string / 3600);
		let minutes = Math.floor((time_string - (hours * 3600)) / 60);
		let seconds = time_string - (hours * 3600) - (minutes * 60);
		return(hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds");
	}

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
				{/*<button onClick={handleClick}>Search Assignment</button>*/}
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignment Analytics:</h1>
				<ReportInfoDisplay />
			</div>
        )
	)
}

export default AssignmentReportsPage;