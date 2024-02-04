import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function UserCourseListPage() {
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
            axios.post('/api/user_course_list', {'_CID': userId})
			.then(response => {
				setData({...response.data});
				console.log(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [updated]); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
        data == {} ? (
		<div>
			
		</div>
        ) : (
            <div>
				<label> Enter the course id:
					<input type='text' onChange={handleChange}/>
				</label>
				<button onClick={handleClick}>Search Course</button>
				<h1>Perusall API Course Return:</h1>
				<li>ID: {data._id} / First Name: {data.firstName} / Last Name: {data.lastName} / Email: {data.email}</li>
			</div>
        )
	)
}

export default UserCourseListPage;