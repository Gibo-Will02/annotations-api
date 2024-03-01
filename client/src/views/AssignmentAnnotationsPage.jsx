import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function AssignmentAnnotationsPage() {
	const [data,setData] = useState([]);
    const [assignmentId, setAssignmentId] = useState("");
	const [courseId, setCourseId] = useState("");

	const [courseUpdated, setCourseUpdated] = useState(courseId);
    const [assignmentUpdated, setAssignmentUpdated] = useState(assignmentId);

	const handleAssignmentChange = (event) => {
		setAssignmentId(event.target.value);

	};

	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}

	const handleClick = () => {
		setAssignmentUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setCourseUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
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

	useEffect(() => {
        if (courseId !== "") {
            axios.post('/api/assignment_annotations', {'_CID': courseId, '_AID': assignmentId})
			.then(response => {
				setData(response.data);
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [assignmentUpdated, courseUpdated]); //[] updates page if value changes, if empty it only updates on entry to the page

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

export default AssignmentAnnotationsPage;