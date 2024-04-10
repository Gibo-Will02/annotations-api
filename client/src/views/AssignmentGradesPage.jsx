import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

/**
 * AssignmentGradesPage component is used for viewing the grades of an assignment
 * @returns React component of a view for the grades of an assignment
 */
const AssignmentGradesPage = () => {
	//data state variable is used for displaying the grades gathered from an assignment
	const [data,setData] = useState([]);

	//assignmentId state variable is used for user input for which assignment to look at.
    const [assignmentId, setAssignmentId] = useState("");

	//courseId state variable is used for setting which course to look under for the assignment.
	const [courseId, setCourseId] = useState("");

	//courseUpdated state variable is used for checking if the courseId has been modified for reloading the screen
	const [courseUpdated, setCourseUpdated] = useState(courseId);

	//assignmentUpdated state variable is used for checking if the assigmentId has been modified for reloading the screen
    const [assignmentUpdated, setAssignmentUpdated] = useState(assignmentId);

	//Custom onChange method for assignment input box
	const handleAssignmentChange = (event) => {
		setAssignmentId(event.target.value);

	};

	//Custom onChange method for course input box
	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}

	//Custom handleClick for the search button to cause a refresh of the screen only when clicked and the ids have been changed
	//Utilizes state change methods to update the assignment/courseUpdated value only when changed
	const handleClick = () => {
		setAssignmentUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setCourseUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
	};

	/**
	 * useEffect will get the assignment grade data only when the the courseId and assignmentId have been inputted
	 * Will reload page when assignment or course id is updated
	 */
	useEffect(() => {
        if (courseId !== "" && assignmentId !=="") {
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
						<input placeholder='Assignment Id Here' type='text' onChange={handleAssignmentChange}/>
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