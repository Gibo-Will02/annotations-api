import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function AssignmentReportsPage() {
	const [data,setData] = useState([]);
    const [assignmentId, setAssignmentId] = useState("");
	const [courseId, setCourseId] = useState("");
    const [reportType, setReportType] = useState("submissionTime");
	const [reportPage, setReportPage] = useState("");

	const [courseUpdated, setCourseUpdated] = useState(courseId);
    const [assignmentUpdated, setAssignmentUpdated] = useState(assignmentId);

    const [reportTypeUpdated, setReportTypeUpdated] = useState(reportType);
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

    const handleReportTypeChange = (report) => {
		console.log(report.target.id);
        setReportType(report.target.id);
    }

	const handleClick = () => {
		setAssignmentUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setCourseUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
		setReportTypeUpdated(prevReportType => prevReportType !== reportType ? reportType : prevReportType);
		setReportPageUpdated(prevReportPage => prevReportPage !== reportPage ? reportPage : prevReportPage);
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
			<DropdownButton data-testid="dropTest" id="reportTypeDropdown" title="Report Type" align='start'>
				<Dropdown.Item onClick={handleReportTypeChange} id="submissionTime">Submission Time</Dropdown.Item>
				<Dropdown.Item onClick={handleReportTypeChange} id="pageViews">Page Views</Dropdown.Item>
				<Dropdown.Item onClick={handleReportTypeChange} id="studentActivity">Student Activity</Dropdown.Item>
				<Dropdown.Item onClick={handleReportTypeChange} id="grades">Grades</Dropdown.Item>
			</DropdownButton>
		)
    }

	const ReportInfoDisplay = (object) => {
		switch (reportType) {
			// case "pageViews":
			// 	return (
			// 		<>
			// 			{(data.length > 0) ?
			// 			data.map((assignment) => {
			// 				return(
			// 					<>
			// 						<li></li>
			// 					</>
			// 				)
			// 			})
			// 			:
			// 			<label>No assignments to display</label>}
			// 		</>
			// 	);
			case "studentActivity":
				return(
					<>
						{(data.length > 0) ?
						data.map((assignment) => {
							return(
								<>
									<li>Annotation ID: {assignment.id} / Student ID: {assignment.studentId} / Text: {assignment.plainText} / Score: {assignment.score ? assignment.score : "No Score"} / 
									Created At: {dateTimeParser(assignment.createdAt)} / Edited At: {dateTimeParser(assignment.editedAt)} </li>
								</>
							)
						})
						:
						<label>No assignments to display</label>}
					</>
				);
			case "grades":
				return(
					<>
						{(data.length > 0) ?
						data.map((assignment) => {
							return(
								<>
									<li>Annotation ID: {assignment.id} / Student ID: {assignment.studentId} / Text: {assignment.plainText} / Score: {assignment.score ? assignment.score : "No Score"} / 
									Created At: {dateTimeParser(assignment.createdAt)} / Edited At: {dateTimeParser(assignment.editedAt)} </li>
								</>
							)
						})
						:
						<label>No assignments to display</label>}
					</>
				);
			default:
				return (
					<>
						{(data.length > 0) ?
						data.map((assignment) => {
							return(
								<>
									<li>Annotation ID: {assignment.id} / Student ID: {assignment.studentId} / Text: {assignment.plainText} / Score: {assignment.score ? assignment.score : "No Score"} / 
									Created At: {dateTimeParser(assignment.createdAt)} / Edited At: {dateTimeParser(assignment.editedAt)} </li>
								</>
							)
						})
						:
						<label>No assignments to display</label>}
					</>
				);
		}
	}

	useEffect(() => {
        if (courseId !== "") {
            axios.post('/api/assignment_analytics', {'_CID': courseId, '_AID': assignmentId, '_REP': reportType})
			.then(response => {
				setData(response.data);
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [assignmentUpdated, courseUpdated, reportTypeUpdated, reportPageUpdated]); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
        (
            <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
				<div>
					<label> Enter the course id:
						<input placeholder='Course Id Here' type='text' onChange={handleCourseChange}/>
					</label>
					<label> Enter the assignment id:
						<input placeholder='Assignment Id Here' type='text' onChange={handleAssignmentChange}/>
					</label>
					
					<button onClick={handleClick}>Search Assignment</button>
				</div>
				<label> Select the report type: 
						<ReportTypeDropDown />
				</label>
				<label>
					Current report type: {reportType}
				</label>
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignment Annotations:</h1>
				{
					(data.length > 0) ?
					data.map((assignment) => {
						return(
							<>
								<li>Annotation ID: {assignment.id} / Student ID: {assignment.studentId} / Text: {assignment.plainText} / Score: {assignment.score ? assignment.score : "No Score"} / 
                                Created At: {dateTimeParser(assignment.createdAt)} / Edited At: {dateTimeParser(assignment.editedAt)} </li>
							</>
						)
					})
					:
					<label>No assignments to display</label>
				}
			</div>
        )
	)
}

export default AssignmentReportsPage;