import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

/**
 * InstitutionCoursesPage component is used for viewing the different courses that an institution may have
 * @returns React component of a view for the courses in an institution
 */
const InstitutionCoursesPage = () => {
	//posts state variable is used for storing the course data that exist for an existing institution
	const [posts,setPosts] = useState([]);

	/**
	 * useEffect will get the courses that exist for an institution
	 * Does not contain any need for a page update, as there is no user input required for the page
	 */
	useEffect(() => {
        axios.get('/api/institution_courses')
        .then(response => {
            setPosts(response.data);
			//console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
	}, []); //[] updates page if value changes, if empty it only updates on entry to the page

	return (
		<div style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
			{posts.length !== 0 ? (
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
			)}
		</div>
	)
}

export default InstitutionCoursesPage;