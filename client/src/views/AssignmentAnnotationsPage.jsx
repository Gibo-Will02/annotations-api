import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

/**
 * The AssignmentAnnotationsPage is used to show the annotations of a desired assignment
 * @returns The react component to be viewed by the user
 */
const AssignmentAnnotationsPage = () => {
	//data state variable is used for displaying the annotations gathered from an assignment
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

	//Custom handleClick for the search button to cause a refresh of the screen only when clicked
	const handleClick = () => {
		setAssignmentUpdated(prevAssignmentId => prevAssignmentId !== assignmentId ? assignmentId : prevAssignmentId);
		setCourseUpdated(prevCourseId => prevCourseId !== courseId ? courseId : prevCourseId);
	};

	/**
	 * useEffect will get the assignment annotation data only when the the courseId and assignmentId have been inputted
	 * Will reload page when assignment or course id is updated
	 */
	useEffect(() => {
        if (courseId !== "" && assignmentId !=="") {
            axios.post('/api/assignment_annotations', {'_CID': courseId, '_AID': assignmentId})
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
				<h1 style={{borderBottom: "1px solid black", display: 'inline-block'}}>Assignment Annotations:</h1>
				{
					(data.length > 0) ?
					<DataTable value={data} tableStyle={{ minWidth: '50rem', maxWidth: '50rem' }}>
							<Column field="perusallAnnotationId" header="Annotation Id"></Column>
							<Column field="courseName" header="Course Name"></Column>
							<Column field="assignmentName" header="Assignment Name"></Column>
							<Column field="email" header="Student email" ></Column>
							<Column field="annotationText" header="Annotation Text" style={{ width: '25%' }}></Column>
						</DataTable>
					:
					<label>No assignments to display</label>
				}
			</div>
        )
	)
}

export default AssignmentAnnotationsPage;