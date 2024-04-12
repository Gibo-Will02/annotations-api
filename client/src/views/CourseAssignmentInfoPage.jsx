import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

/**
 * CourseAssignmentInfoPage component is used for viewing the generl info of an assignment
 * @returns React component of a view for the general info of an assignment
 */
const CourseAssignmentInfoPage = () => {
	//data state variable is used for displaying the assignments gathered from a course
	const [data,setData] = useState([]);

	//courseId state variable is used for setting which course to look under for the assignments.
	const [courseId, setCourseId] = useState("");

	//Updated state variable is for checking to see if the courseId has been updated for a screen reload using useEffect
	const [updated, setUpdated] = useState(courseId);

	//Custom onChange event for setting the courseId to the desired user input
	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}

	//Custom click event for setting if the courseId has been updated for a screen reload if the search button is clicked
	const handleClick = () => {
		setUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
	};

	/**
	 * useEffect will get the assignments data only when the the courseId has been inputted
	 * Will reload page when course id is updated after search button click
	 */
	useEffect(() => {
        if (courseId !== "") {
            axios.post('/api/course_assignments', {'_CID': courseId})
			.then(response => {
				setData(response.data);
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [updated]); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
        (
            <div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
				<div>
					<label> Enter the course id:
						<input placeholder='Course Id Here' type='text' onChange={handleCourseChange}/>
					</label>
					{/* <label> Enter the assignment id:
						<input type='text' onChange={handleAssignmentChange}/>
					</label> */}
					<button onClick={handleClick}>Search Course</button>
				</div>
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignments (From Perusall):</h1>
				{
					(data.length > 0) ?
					data.map((assignment) => {
						return((Array.isArray(assignment.documentIds) === true) ?
						<>
							<h2>Name: {assignment.name}</h2>
							<p>Assignment ID: {assignment._id} / Deadline: {assignment.deadline} </p>
							<p> {assignment.documentIds.map((id) => {
								return (<li>Document ID: {id}</li>);
							})} </p>
							<hr style={{minWidth: "50%"}}/>
						</>
						:
						<>
							<h2>Name: {assignment.name}</h2>
							<li>Assignment ID: {assignment._id} / Document ID: {assignment.documentIds}/ Deadline: {assignment.deadline} </li>
							<hr style={{minWidth: "50%"}}/>
						</>);
					})
					:
					<label>No assignments to display</label>
				}
			</div>
        )
	)
}

export default CourseAssignmentInfoPage;