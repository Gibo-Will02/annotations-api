//this file is just a mockup of the Assignment Analytics api return call
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";

const MockAssignmentAnalytics = () => {

    //mocked data that would be returned 
    const mockData = [
        {
            "name": "Gibson Williams",
            "group": 1,
            "viewingTime": "15 hours, 27 minutes",
            "activeTime": "45 minutes(5%)",
            "commentCount": 12,
            "threadsStarted": 5,
            "responses": 7,
            "nonquestionUpvotesGiven": 1,
            "questionUpvotesGiven": 0,
            "nonQuestionUpvotesReceived": 2,
            "questionUpvotesReceived": 0,
            "wordCount": 71,
            "averageWordComment": 5.92
        },
        {
            "name": "Test Student",
            "group": 2,
            "viewingTime": "15 hours, 27 minutes",
            "activeTime": "45 minutes(5%)",
            "commentCount": 8,
            "threadsStarted": 3,
            "responses": 5,
            "nonquestionUpvotesGiven": 3,
            "questionUpvotesGiven": 2,
            "nonQuestionUpvotesReceived": 7,
            "questionUpvotesReceived": 1,
            "wordCount": 593,
            "averageWordComment": 23
        }
    ]

    return(
        <>
            <DataTable value={mockData} tableStyle={{ minWidth: '50rem' }}>
                <Column field="name" header="Name"></Column>
                <Column field="group" header="Group"></Column>
                <Column field="viewingTime" header="Viewing Time"></Column>
                <Column field="activeTime" header="Active Engagment Time"></Column>
                <Column field="commentCount" header="Total Comments"></Column>
                <Column field="threadsStarted" header="Threads Started"></Column>
                <Column field="responses" header="Responses"></Column>
                <Column field="nonquestionUpvotesGiven" header="Non-question upvotes given"></Column>
                <Column field="questionUpvotesGiven" header="Question upvotes given"></Column>
                <Column field="nonQuestionUpvotesReceived" header="Non-question upvotes given"></Column>
                <Column field="questionUpvotesReceived" header="Question upvotes received"></Column>
                <Column field="wordCount" header="Total word count"></Column>
                <Column field="averageWordComment" header="Average words per comment"></Column>
            </DataTable>
        </>
    )
}

export default MockAssignmentAnalytics;