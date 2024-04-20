import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

const InstitutionDataPage = () => {
	//rows state variable is the data used for displaying the desired formatted rows for the students and instructors of a course in the data table
	const [rows, setRows] = useState([]);

	//expadedRows state variable is used for keeping track of which rows are expanded in the data table
	//Required, do not remove as data table has no way of seeing which rows have been expanded
	const [expandedRows, setExpandedRows] = useState([]);

	//useEffect uses the intitution_roster, institution_courses, and course_data api routes to create the rows for displaying the course rosters
	//This is place holder code for getting display created.
	//REFACTOR TO USE DATABASE QUERY WHEN COMPLETED!!!
    useEffect(() => {
        axios.get('/api/institution_roster')
		.then(response => {
			//iRoster is used to hold the roster of the entire institution
			const iRoster = [...response.data];
			axios.get('/api/institution_courses')
			.then(response => {
				//Collect an array of all the different courses and their data.
				var promises = response.data.map(course => {
					return axios.post('/api/course_data', {'_CID': course._id})
				})
				//Get all of the data for all of the courses
				Promise.all(promises).then(response => {
					//displayRow is used to easily create the rows, will be the value used for rows state variable
					const displayRow = [];

					//uniqueRostersStudent is used to hold which individuals are students for which course
					const uniqueRostersStudent = {};
					
					//uniqueRostersInstructor is used to hold which individuals are instructors for which course
					const uniqueRostersInstructor = {};

					//Gets all of the names from the institution roster, and puts them in the format of: first_name last_name
					const names = {};
					iRoster.forEach((student) => {
						if(!names.hasOwnProperty(student._id)) names[student._id] = `${student.firstName} ${student.lastName}`
					})

					//The below code uses the institution roster and names to link the courses instructors ids to their names and role
					response.forEach((course) => {
						if (!uniqueRostersInstructor.hasOwnProperty(course.data.name)) uniqueRostersInstructor[course.data.name] = course.data.instructorIds;
					})
					for(var course in uniqueRostersInstructor) {
						uniqueRostersInstructor[course].forEach((id) => {
							displayRow.push({'course': course, 'name': names[id], 'role': 'Instructor'});
						});
					}

					//The below code uses the institution roster and names to link the courses students ids to their names and role
					response.forEach((course) => {
						if (!uniqueRostersStudent.hasOwnProperty(course.data.name)) uniqueRostersStudent[course.data.name] = course.data.studentIds;
					})
					//console.log(uniqueRostersStudent)
					for(var course in uniqueRostersStudent) {
						uniqueRostersStudent[course].forEach((id) => {
							displayRow.push({'course': course, 'name': names[id], 'role': 'Student'});
						});
					}
					//console.log(displayRow);
					
					//Before setting the rows to the displayRows, sort the array to be in the order of the courses.
					displayRow.sort((a,b) => a.course.localeCompare(b.course))
					setRows([...displayRow]);
				})
				.catch(error => {
					console.error(error);
				})
			})
			.catch(error => {
				console.error(error);
			});
		})
		.catch(error => {
			console.error(error);
		});

    }, [])

	//Custom headerTemplate for the expandable data table, used to see the course name
	const headerTemplate = (data) => {
		return (
			<React.Fragment>
				<span className="vertical-align-middle ml-2 font-bold line-height-3" style={{borderBottom:'solid 3px'}}>{data.course}</span>
			</React.Fragment>
		);
	};

	/**
	 * Custom method utilized to count the number of students in a course
	 * @param {*} course - Used to get compare a the course id with a student to count the number of students
	 * @returns The total number of students in a course
	 */
	const calculateCustomerTotal = (course) => {
		console.log(course);
        let total = 0;

        if (rows) {
            for (let student of rows) {
                if (student.course === course && student.role === "Student") {
                    total++;
                }
            }
        }

		//console.log(rows.sort((a,b) => a.course - b.course));

        return total;
    };

	//Custom footer template for the expandable data table. The react component shows the total number of students in the course
    const footerTemplate = (data) => {
        return (
            <React.Fragment>
                <td colSpan="3">
                    <div style={{display: 'flex', backgroundColor: '#512888', color:'white'}} className="justify-content-end font-bold w-full">Total Students: {calculateCustomerTotal(data.course)}</div>
                </td>
            </React.Fragment>
        );
    };
	
	return (
		<>
			<div style={{alignItems: 'center', flexDirection: 'column', display: 'flex'}}>
				<DataTable data-testid="tableTest" value={rows} scrollable rowGroupMode="subheader" groupRowsBy="course" removableSort
					rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
					expandableRowGroups expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
					tableStyle={{ minWidth: '70rem', maxWidth: '100rem'}}>
					<Column field="course" filter sortable header="Course" style={{ width: '10%' }}></Column>
					<Column field="name" header="Name" style={{ width: '10%' }}></Column>
					<Column field="role" header="Role" style={{ width: '10%' }}></Column>
				</DataTable>
			</div>
		</>
	)
}

export default InstitutionDataPage;