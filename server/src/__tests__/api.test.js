const request = require('supertest');
const nock = require('nock');
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


describe('checks the data of an API users call', () => {
    // beforeEach(() => {
    //     nock('https://app.perusall.com/api/v1/users', {
    //         reqheaders: {
    //             "X-Institution": process.env.INSTITUTION,
    //             "X-API-TOKEN": process.env.TOKEN
    //         },
    //     })
    //     .get('')
    //     .reply(200)
    // });

    it('checks if the API call returns the expected data', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/users', config);
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, require('./users.json')); // json data from postman
    });
});

describe('Checks the API call for the courses in the institution', () => {
    it('Checks if the API call returns the expected data', async () => {
        const response = await axios.get("https://app.perusall.com/api/v1/courses/", config);
        assert.strictEqual(response.status, 200);
        assert.deepStrictEqual(response.data, require('./courses.json')) // json data from postman
    })
})

describe('Checks the data of a course API call based on course ID', () => {
    it('Checks if the API call returns the expected data', async () => {
        const response = await axios.get('https://app.perusall.com/api/v1/courses/' + "BRhk8oFtsmnsBHKo4", config);
        assert.strictEqual(response.status, 200)
        assert.deepStrictEqual(response.data, require('./courseData.json')); // json data from postman
    })
});

