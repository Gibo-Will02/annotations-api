// A mock of prime react dropdown object may be usefull for testing
import React, { useState, useEffect } from 'react';
import { Tree } from 'primereact/tree';

const MockCourseDataDropdown = () => {

    const data = [
        {
            key: '0',
            label: 'Course 1',
            data: 'Documents Folder',
            icon: 'pi pi-fw pi-home',
            children: [
                {
                    key: '0-0',
                    label: 'Students',
                    data: 'Student Data',
                    icon: 'pi pi-fw pi-users',
                    children: [
                        { key: '0-0-0', label: 'Student 1', icon: 'pi pi-fw pi-user', data: 'Expenses Document' },
                        { key: '0-0-1', label: 'Student 2', icon: 'pi pi-fw pi-user', data: 'Resume Document' }
                    ]
                },
                {
                    key: '0-1',
                    label: 'Assignments',
                    data: 'Assignment Data',
                    icon: 'pi pi-fw pi-folder',
                    children: [{ key: '0-1-0', label: 'Assignment 1', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                }
            ]
        },
    ]


    return (
        <div className="card flex justify-content-center">
            <Tree value={data} className="w-screen" style={{width: '25vh', height: '100vh'}} />
        </div>
    )
}

export default MockCourseDataDropdown