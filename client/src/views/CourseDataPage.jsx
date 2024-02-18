import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function CourseDataPage() {
	const [data,setData] = useState({});
    const [userId, setUserId] = useState("");

	const [updated, setUpdated] = useState(userId);

	const handleChange = (event) => {
		setUserId(event.target.value);
	};

	const handleClick = () => {
		setUpdated(prevUserId => prevUserId !== userId ? userId : prevUserId);
	};

	useEffect(() => {
        if (userId !== "") {
            axios.post('/api/course_data', {'_CID': userId})
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
		<div>
			<label> Enter the course id:
				<input placeholder="Course Id Here" type='text' onChange={handleChange}/>
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