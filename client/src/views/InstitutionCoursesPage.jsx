import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function InstitutionCoursesPage() {
	const [posts,setPosts] = useState([]);

	useEffect(() => {
        axios.get('/api/institution_courses')
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            console.error(error);
        });
	}, []); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
        posts.length !== 0 ? (
		<div>
			<h1>Perusall API Course Return:</h1>
			{posts.map((post) => {
				return(<li>ID: {post._id} / Course Name: {post.name}</li>)
			})}
		</div>
        ) : (
            <div>
				<label >Loading data</label>
			</div>
        )
	)
}

export default InstitutionCoursesPage;