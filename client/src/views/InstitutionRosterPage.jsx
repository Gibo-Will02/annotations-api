import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function InstitutionRosterPage() {
	const [posts,setPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/institution_roster')
		.then(response => {
			setPosts(response.data);
			//console.log(response.data);
		})
		.catch(error => {
			console.error(error);
		});
	}, []); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
		<div>
			<h1>Perusall API User Return:</h1>
			{posts.map((post) => {
				return(<li>ID: {post._id} / First Name: {post.firstName} / Last Name: {post.lastName} / Email: {post.email}</li>)
			})}
		</div>
	)
}

export default InstitutionRosterPage;


