const axios = require('axios');
const assert = require('assert');
require('dotenv').config();

const config = { //put into router file
    headers: {
      "X-Institution": process.env.INSTITUTION,
      "X-API-TOKEN": process.env.TOKEN
    },
    responseType: "json"
}


describe('Checks the data of an API users call', () => {
    it('Checks if the API call returns the expected data', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/users', config);
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/users.json')); // json data from postman
    });
});

describe('Checks the API call for the courses in the institution', () => {
    it('Checks if the API call returns the expected data', async () => {
        const response = await axios.get("https://app.perusall.com/api/v1/courses/", config);
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/courses.json')) // json data from postman
    })
})

describe('Checks the data of a course API call based on course ID', () => {
    it ('Gets the IDs for each course and checks for the expected course data', async () => {
        const res = await axios.get('https://app.perusall.com/api/v1/courses/', config);
        const keys = Object.keys('./jsonTestFiles/courses.json'); //gets the keys of the json file
        for (let i = 0; i < keys.length; i++) { 
            if (keys[i] == "_id") { //checks if key is the course id
                const response = await axios.get('https://app.perusall.com/api/v1/courses/' + obj(keys[i]), config); //API call for the given courseID
                assert.strictEqual(response.status, 200)
                assert.deepStrictEqual(response.data, require('./jsonTestFiles/courseData.json')); // json data from postman
            }
        }
    })
});

describe('Checks the scores of an assignment API call based on course ID and assignment ID', () => {
    it ('Checks for the expected scores of the given course with the given assignment', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/courses/' + "BRhk8oFtsmnsBHKo4" + "/assignments/" + "qB83qbw8vnAPYNEwm" + "/scores", config); //API call for the given courseID
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/assignmentScores.json')); // json data from postman
    })
    it ('Checks for the expected scores of the given course with a second given assignment', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/courses/' + "BRhk8oFtsmnsBHKo4" + "/assignments/" + "dQNPoRBd2PBH52ABp" + "/scores", config); //API call for the given courseID
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/assignmentScores.json')); // json data from postman
    })
});

describe('Checks the analytics of an assigment API call', () => {
    it('Checks for the expected grades of the assignment', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/courses/' + "BRhk8oFtsmnsBHKo4" + "/assignments/" + "qB83qbw8vnAPYNEwm" + "/analytics/" + "grades" + "/" + "1", config); //API call for the given courseID
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data.grades, require('./jsonTestFiles/gradeAnalytics.json')); // json data from postman
    })
    it('Checks for the expected student activity report of the assignment', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/courses/' + "BRhk8oFtsmnsBHKo4" + "/assignments/" + "dQNPoRBd2PBH52ABp" + "/analytics/" + "studentActivity" + "/" + "1", config); //API call for the given courseID
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data.report, require('./jsonTestFiles/activityAnalytics.json')); // json data from postman
    })
});

describe('API call checks the list of courses of a user', () => {
    it('Checks for the expected list of courses of a given user', async () => {
        const response = await axios.get("https://app.perusall.com/api/v1/courses/" + "BRhk8oFtsmnsBHKo4" + "/assignments", config); //API call for the given courseID
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/assignments.json')); // json data from postman
    })
});

describe('API call for the annotations of a course assignment', () => {
    it('Checks for the expected annotations of the given assignment on the given course', async () => {
        const response = await axios.get("https://app.perusall.com/api/v1/courses/" + "BRhk8oFtsmnsBHKo4" + "/assignments/" + "qB83qbw8vnAPYNEwm" + "/annotations", config); //API call for the given courseID
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, require('./jsonTestFiles/annotations.json')); // json data from postman
    })
});
