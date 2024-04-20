import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

const InstitutionDataPage = () => {
	const [rows, setRows] = useState([]);
	const [expandedRows, setExpandedRows] = useState([]);

    useEffect(() => {
        axios.get('/api/institution_roster')
		.then(response => {
			const iRoster = [...response.data];
			axios.get('/api/institution_courses')
			.then(response => {
				var promises = response.data.map(course => {
					return axios.post('/api/course_data', {'_CID': course._id})
				})
				Promise.all(promises).then(response => {
					const displayRow = [];
					const uniqueRostersStudent = {};
					const uniqueRostersInstructor = {};
					const names = {};
					iRoster.forEach((student) => {
						if(!names.hasOwnProperty(student._id)) names[student._id] = `${student.firstName} ${student.lastName}`
					})
					response.forEach((course) => {
						if (!uniqueRostersInstructor.hasOwnProperty(course.data.name)) uniqueRostersInstructor[course.data.name] = course.data.instructorIds;
					})
					for(var course in uniqueRostersInstructor) {
						uniqueRostersInstructor[course].forEach((id) => {
							displayRow.push({'course': course, 'name': names[id], 'role': 'Instructor'});
						});
					}
					response.forEach((course) => {
						if (!uniqueRostersStudent.hasOwnProperty(course.data.name)) uniqueRostersStudent[course.data.name] = course.data.studentIds;
					})
					console.log(uniqueRostersStudent)
					for(var course in uniqueRostersStudent) {
						uniqueRostersStudent[course].forEach((id) => {
							displayRow.push({'course': course, 'name': names[id], 'role': 'Student'});
						});
					}
					console.log(displayRow);
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

	const headerTemplate = (data) => {
		return (
			<React.Fragment>
				<span className="vertical-align-middle ml-2 font-bold line-height-3" style={{borderBottom:'solid 3px'}}>{data.course}</span>
			</React.Fragment>
		);
	};

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

		console.log(rows.sort((a,b) => a.course - b.course));

        return total;
    };

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