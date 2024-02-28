import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function AssignmentGradesPage() {
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

	useEffect(() => {
        if (courseId !== "") {
            axios.post('/api/assignment_grades', {'_CID': courseId, '_AID': assignmentId})
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
						<input type='text' onChange={handleAssignmentChange}/>
					</label>
					<button onClick={handleClick}>Search Assignment</button>
				</div>
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignment Grades:</h1>
				{
					(data.length > 0) ?
					data.map((assignment) => {
						return(
							<>
								<li>Student ID: {assignment.studentId} / Score: {assignment.score ? assignment.score : "No Score"} / Released: {assignment.released ? "True" : "False"} </li>
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

export default AssignmentGradesPage;