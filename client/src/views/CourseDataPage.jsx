import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

/**
 * CourseDataPage component is used for viewing general data of a course
 * @returns React component of a view for the general data of a course
 */
const CourseDataPage = () => {
	//data state variable is used for displaying the general data gathered from a course
	const [data,setData] = useState([]);

	//courseId state variable is used for setting which course to look under for the general data.
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
	 * useEffect will get the general course data only when the the courseId has been inputted
	 * Will reload page when course id is updated after search button click
	 */
	useEffect(() => {
        if (courseId !== "") {
            axios.post('/api/course_data', {'_CID': courseId})
			.then(response => {
				setData({...response.data});
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [updated]); //[] updates page if value changes, if empty it only updates on entry to the page
	
	/*client/src/views/CourseDataPage.jsx*/
	return (
		<div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
			<label> Enter the course id:
				<input placeholder="Course Id Here" type='text' onChange={handleCourseChange}/>
			</label>
			<button onClick={handleClick}>Search Course</button>
			<h1>Perusall API Course Return:</h1>
			<h2>Course Name: {data.name}</h2> 
			<li>ID: {data._id}</li>
			{(data.instructorIds && data.instructorIds.length > 0) ? (
				data.instructorIds.map(id => <li key={id}>Instructor Id: {id}</li>)
			) : (
				<li>No instructor IDs available</li>
			)}
			{(data.studentIds && data.studentIds.length > 0) ? (
				data.studentIds.map(id => <li key={id}>Student Id: {id}</li>)
			) : (
				<li>No student IDs available</li>
			)}
		</div>
    )
}

export default CourseDataPage;