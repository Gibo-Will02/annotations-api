import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function UserCourseListPage() {
	const [posts,setPosts] = useState([]);
    const [userId, setUserId] = useState("");

	const [updated, setUpdated] = useState(userId);

	const handleChange = (event) => {
		setUserId(event.target.value);

	};

	const handleClick = () => {
		setUpdated(userId);
	};

	useEffect(() => {
        if (userId !== "") {
            axios.get('/api/user_course_list')
			.then(response => {
				setPosts(response.data);
			})
			.catch(error => {
				console.error(error);
			});
        }
	}, [updated]); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
        posts.length !== 0 ? (
		<div>
			<h1>Perusall API Course Return:</h1>
			{posts.map((post) => {
				return(<li>ID: {post._id} / First Name: {post.firstName} / Last Name: {post.lastName} / Email: {post.email}</li>)
			})}
		</div>
        ) : (
            <div>
				<label> Enter the course id:
					<input type='text' onChange={handleChange}/>
				</label>
				<button onClick={handleClick}>Search User</button>
			</div>
        )
	)
}

export default UserCourseListPage;