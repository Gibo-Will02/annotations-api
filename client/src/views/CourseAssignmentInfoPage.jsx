import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function CourseAssignmentInfoPage() {
	const [data,setData] = useState([]);
    //const [assignmentId, setAssignmentId] = useState("");
	const [courseId, setCourseId] = useState("");

	const [updated, setUpdated] = useState(courseId);

	// const handleAssignmentChange = (event) => {
	// 	setAssignmentId(event.target.value);

	// };

	const handleCourseChange = (event) => {
		setCourseId(event.target.value);
	}

	const handleClick = () => {
		//setUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
	};

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
						<input type='text' onChange={handleCourseChange}/>
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