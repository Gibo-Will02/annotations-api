import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

const MockAssignmentPageAnalytics = () => {

    const timeConvertor = (time_string) => {
		let hours = Math.floor(time_string / 3600);
		let minutes = Math.floor((time_string - (hours * 3600)) / 60);
		let seconds = Math.floor(time_string - (hours * 3600) - (minutes * 60));
		return(hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds");
	}

    const mockData = [
        {
            "_id": 1,
            "views": 74,
            "averageTime": timeConvertor(224.25019178082192)
        },
        {
            "_id": 2,
            "views": 27,
            "averageTime": timeConvertor(27.46173333333333)
        },
        {
            "_id": 3,
            "views": 18,
            "averageTime": timeConvertor(29.529944444444443)
        },
        {
            "_id": 4,
            "views": 14,
            "averageTime": timeConvertor(17.369714285714284)
        },
        {
            "_id": 5,
            "views": 14,
            "averageTime": timeConvertor(25.74792857142857)
        },
        {
            "_id": 6,
            "views": 14,
            "averageTime": timeConvertor(55.37121428571429)
        },
        {
            "_id": 7,
            "views": 14,
            "averageTime": timeConvertor(947.2472142857142)
        },
        {
            "_id": 8,
            "views": 5,
            "averageTime": timeConvertor(37.9904)
        },
        {
            "_id": 9,
            "views": 10,
            "averageTime": timeConvertor(122.99750000000002)
        },
        {
            "_id": 10,
            "views": 21,
            "averageTime": timeConvertor(32.99204761904762)
        },
        {
            "_id": 11,
            "views": 4,
            "averageTime": timeConvertor(8.87125)
        }
    ]

    return(
        <>
            <DataTable value={mockData} tableStyle={{ minWidth: '50rem' }}>
                <Column field="_id" header="Page ID"></Column>
                <Column field="views" header="Page Views"></Column>
                <Column field="averageTime" header="Average Interaction Time"></Column>
            </DataTable>
        </>
    )
}

export default MockAssignmentPageAnalytics;