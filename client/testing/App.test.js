
import { render, screen, fireEvent, getByPlaceholderText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
//import userEvent from "@testing-library/user-event";
import { act } from 'react-dom/test-utils';
import App from '../src/App';
import renderer from "react-test-renderer";
import { JSX } from 'react/jsx-dev-runtime';
import CourseDataPage from '../src/views/CourseDataPage';
import InstitutionCoursesPage from '../src/views/InstitutionCoursesPage';
import InstitutionRosterPage from '../src/views/InstitutionRosterPage';
import CourseAssignmentInfoPage from '../src/views/CourseAssignmentInfoPage';
import AssignmentGradesPage from '../src/views/AssignmentGradesPage';
import AssignmentAnnotationsPage from '../src/views/AssignmentAnnotationsPage';
import AssignmentReportsPage from '../src/views/AssignmentReportsPage';
import axios, { Axios } from "axios";
import { Dropdown } from 'primereact/dropdown';


// allows us to mock an Axios call function for API Testing
jest.mock('axios');

//#region course data page tests
describe("Jest Snapshot testing suite", () => {
  //compares a render page to what it looks like in a snapshot
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<CourseDataPage />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});

test('course data page displays correct information', () => {
  render(<CourseDataPage />);
  const TextElement = screen.getByText("Perusall API Course Return:");
  expect(TextElement).toBeInTheDocument();
});

test('course data page displays correct information', () => {
  render(<CourseDataPage />);
  const TextElement = screen.getByText("Course Name:");
  expect(TextElement).toBeInTheDocument();
});

test('course data page has search button and activates', ()=> {
    render(<CourseDataPage />);
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);
    expect(nButton1.toHaveBeenCalled);
});

describe('Api Testing course data page', () => {
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds', async ()=> {
    
    const responseData = {
      name: 'Test Course',
      _id: '123',
      instructorIds: ['456', '789'],
      studentIds: ['abc', 'def'],
    };
    //jest Axios Mock and acts like the API call returned responseData
    axios.post.mockResolvedValueOnce({ data: responseData });

    const { getByPlaceholderText, getByText } = render(<CourseDataPage />);
    const myinput = getByPlaceholderText('Course Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    const cdpButton1 = getByText('Search Course');
    fireEvent.click(cdpButton1);
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/course_data', { '_CID': 'BRhk8oFtsmnsBHKo4' });
    });

    expect(getByText('Perusall API Course Return:')).toBeInTheDocument();
    expect(getByText('Course Name:')).toBeInTheDocument();
    expect(getByText('ID:')).toBeInTheDocument();
  });

  
  
  test('renders failstate when no person is found', async ()=> {
    
    render(<CourseDataPage />);
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('No instructor IDs available')).toBeInTheDocument();
    expect(await screen.findByText('No student IDs available')).toBeInTheDocument();
  });
  
});
//#endregion


//#region Institution courses page tests
describe("Jest Snapshot testing suite", () => {
  //compares a render page to what it looks like in a snapshot
  it("Matches DOM Snapshot", () => {
    const instPage = renderer.create(<InstitutionCoursesPage />).toJSON();
    expect(instPage).toMatchSnapshot();
  });
});


describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });
  
  //tests if API call Properly Responds
  test('renders info when API call succeeds institute courses', async ()=> {
    const responseDataTwo = [
      { _id: '3', name: 'Test Installment' },
      { _id: '4', name: 'False life high' }
    ];
    //mocks the api implementation once and ensures that the test data set is all that is returned
    axios.get.mockImplementationOnce(() => Promise.resolve(responseDataTwo));
    const { getByText } = render(<InstitutionCoursesPage />);

    //waits for Api call to have processed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/institution_courses');
    });

   });

});

//#endregion


//#region Institution Roster page Tests
describe('Api sends information through', () => {
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });
  
  test('renders info when API call succeeds', async ()=> {
    //test response data
    const responseData = [
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { _id: '2', firstName: 'Noah', lastName: 'way', email: 'nway@bht.com' },
    ];
    //mocks an API call that has a set response
    axios.get.mockResolvedValueOnce({ data: responseData });
    
    const page = render(<InstitutionRosterPage />);
    const { getByText } = page;

    //waits for Api call to have processed
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/institution_roster');
    });
    
    expect(getByText('Perusall API User Return:')).toBeInTheDocument();
    expect(page).toMatchSnapshot();

  });

});


//#endregion


//#region course Assignment info page tests
describe("Jest Snapshot testing suite", () => {
  it("Matches CourseAssignmentPage Snapshot", () => {
    const uscPage = render(<CourseAssignmentInfoPage />);
    expect(uscPage).toMatchSnapshot();
  });
});


describe('Api Testing using Fake Data', () => {
  
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds for CourseAssignInfo', async ()=> {
    
    const responseData = {
      name: 'Test Course',
      _id: '123',
      instructorIds: [],
      studentIds: ['abc', 'def'],
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<CourseAssignmentInfoPage />);
    const { getByPlaceholderText, getByText } = page;
    const myinput = getByPlaceholderText('Course Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    const cdpButton1 = getByText('Search Course');
    fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/course_assignments', { '_CID': 'BRhk8oFtsmnsBHKo4' });
    });

   });

  
});
//#endregion


//#region AssignmentGradesPage tests

describe("Jest Snapshot testing suite", () => {
  it("Matches AssignmentGradesPage Snapshot", () => {
    const agpPage = render(<AssignmentGradesPage />);
    expect(agpPage).toMatchSnapshot();
  });
});


describe('Api Testing using Fake Data for AssignmentGrades Page', () => {
  
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds for AssignmentGrades', async ()=> {
    
    const responseData = {
      studentId: "PrbNxbp98xHHpmuAH",
      score: 2,
      released: true,
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<AssignmentGradesPage />);
    const { getByPlaceholderText, getByText } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    const cdpButton1 = getByText('Search Assignment');
    fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_grades', { '_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm'});
    });

   });

  
});
//#endregion


//#region AssignmentAnnotationsPage tests
describe("Jest Snapshot testing suite", () => {
  it("Matches AssignmentAnnotationsPage Snapshot", () => {
    const aapPage = render(<AssignmentAnnotationsPage />);
    expect(aapPage).toMatchSnapshot();
  });
});


describe('Api Testing using Fake Data for AssignmentAnnotations Page', () => {
  
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds for AssignmentAnnotations', async ()=> {
    
    const responseData = {
      id: "W5Cer9NdrPKwQSeHK",
      studentId: "PrbNxbp98xHHpmuAH",
      text: "<p>I agree - good point!</p>",
      plainText: "I agree - good point!",
      score: 0,
      createdAt: "2022-10-19T16:02:03.980Z",
      editedAt: "2022-10-19T16:02:03.979Z"
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<AssignmentAnnotationsPage />);
    const { getByPlaceholderText, getByText } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    const cdpButton1 = getByText('Search Assignment');
    fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_annotations', { '_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm'});
    });

   });

  
});
//#endregion


//#region AssignmentReportsPage Tests 
describe("Jest Snapshot testing suite", () => {
  it("Matches AssignmentReportsPage Snapshot", () => {
    const aapPage = render(<AssignmentReportsPage />);
    expect(aapPage).toMatchSnapshot();
  });
});


describe('Api Testing using Fake Data for AssignmentReports Page', () => {
  
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  /*
  test('checks to see if the API call succeeds for AssignmentReports with report type Submission Time', async ()=> {
    
    const responseData = {
      id: "W5Cer9NdrPKwQSeHK",
      studentId: "PrbNxbp98xHHpmuAH",
      text: "<p>I agree - good point!</p>",
      plainText: "I agree - good point!",
      score: 0,
      createdAt: "2022-10-19T16:02:03.980Z",
      editedAt: "2022-10-19T16:02:03.979Z"
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<AssignmentReportsPage />);
    const { getByPlaceholderText, getByText } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');
    const selectDropdown = await waitFor(
      () => screen.getByTestId("dropTest"),
      {
        timeout: 3000,
      }
    );

    expect(selectDropdown).toBeInTheDocument();
    //these firevents change the two places where you input data to look for information
    //this one is for course ID
    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    //this one is for Assignment ID
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    fireEvent.click(screen.getByText("Report Type"));

    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    const cdpButton1 = getByText('Search Assignment');
    fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'submissionTime'});
    });

  });
  */

  test('checks to see if the API call succeeds for AssignmentReports with report type Page Views', async ()=> {
    
    const responseData = {
      id: "W5Cer9NdrPKwQSeHK",
      studentId: "PrbNxbp98xHHpmuAH",
      text: "<p>I agree - good point!</p>",
      plainText: "I agree - good point!",
      score: 0,
      createdAt: "2022-10-19T16:02:03.980Z",
      editedAt: "2022-10-19T16:02:03.979Z"
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<AssignmentReportsPage />);
    const { getByPlaceholderText, getByText, getByTestId } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');
    const inputThree = getByPlaceholderText('Report Page Here');
    const selectDropdown = await waitFor(
      () => getByTestId("dropTest"),
      {
        timeout: 3000,
      }
    );

    expect(selectDropdown).toBeInTheDocument();
    //these firevents change the two places where you input data to look for information
    //this one is for course ID
    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    //this one is for Assignment ID
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    //this one changes the report page number
    fireEvent.change(inputThree, {
      target: {value: '0' }
    });
    //selectDropdown.value = 'pageViews';
    //fireEvent.change(selectDropdown, { target: { options: 'pageViews' } });
    fireEvent.select(selectDropdown, {options: 'pageViews'});

    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    expect(inputThree.value).toBe('0');
    //const cdpButton1 = getByText('Search Assignment');
    //fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'pageViews', '_P': '0'});
    });

  });
  

  test('checks to see if the API call succeeds for AssignmentReports with report type Student Activity', async ()=> {
    
    const responseData = {
      id: "W5Cer9NdrPKwQSeHK",
      studentId: "PrbNxbp98xHHpmuAH",
      text: "<p>I agree - good point!</p>",
      plainText: "I agree - good point!",
      score: 0,
      createdAt: "2022-10-19T16:02:03.980Z",
      editedAt: "2022-10-19T16:02:03.979Z"
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });

    const page = render(<AssignmentReportsPage />);
    const { getByPlaceholderText, getByText, getByTestId } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');
    const inputThree = getByPlaceholderText('Report Page Here');
    const selectDropdown = await waitFor(
      () => getByTestId("dropTest"),
      {
        timeout: 3000,
      }
    );

    expect(selectDropdown).toBeInTheDocument();
    //these firevents change the two places where you input data to look for information
    //this one is for course ID
    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    //this one is for Assignment ID
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    //this one changes the report page number
    fireEvent.change(inputThree, {
      target: {value: '0' }
    });
    //selectDropdown.value = 'studentActivity';
    //fireEvent.change(selectDropdown, { target: { options: 'studentActivity' } });
    fireEvent.select(selectDropdown, {options: 'studentActivity'});
    

    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    expect(inputThree.value).toBe('0');
    //const cdpButton1 = getByText('Search Assignment');
    //fireEvent.click(cdpButton1);

    //the panic button
    const response = await axios.post('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'studentActivity', '_P': '0'});
    
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'studentActivity', '_P': '0'});
    });

  });


  test('checks to see if the API call succeeds for AssignmentReports with report type Grades', async ()=> {
    
    const responseData = {
      id: "W5Cer9NdrPKwQSeHK",
      studentId: "PrbNxbp98xHHpmuAH",
      text: "<p>I agree - good point!</p>",
      plainText: "I agree - good point!",
      score: 0,
      createdAt: "2022-10-19T16:02:03.980Z",
      editedAt: "2022-10-19T16:02:03.979Z"
    };
    //mocks the api call with set data
    axios.post.mockResolvedValueOnce({ data: responseData });
    const page = render(<AssignmentReportsPage />);
    const { getByPlaceholderText, getByText } = page;
    const myinput = getByPlaceholderText('Course Id Here');
    const inputTwo = getByPlaceholderText('Assignment Id Here');
    const inputThree = getByPlaceholderText('Report Page Here');
    const selectDropdown = await waitFor(
      () => screen.getByTestId("dropTest"),
      {
        timeout: 3000,
      } 
    );

    expect(selectDropdown).toBeInTheDocument();
  
    //these firevents change the two places where you input data to look for information
    //this one is for course ID
    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    //this one is for Assignment ID
    fireEvent.change(inputTwo, {
      target: {value: 'qB83qbw8vnAPYNEwm' }
    });
    //this one changes the report page number
    fireEvent.change(inputThree, {
      target: {value: '0' }
    });
    
    fireEvent.select(selectDropdown, {options: 'grades'});
    
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    expect(inputThree.value).toBe('0');
    //const cdpButton1 = getByText('Search Assignment');
    //fireEvent.click(cdpButton1);

    //the panic button
    const response = await axios.post('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'grades', '_P': '0'});

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(2);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'grades', '_P': '0'});
    });

  });

});
//#endregion


//#region Sanity tests for the pages
describe('Api Tests that confirm that the Api Return Structure is the same as described in perusalls API Documentation', () => {
  
  beforeEach(() => {
    //clears the Axios mock so that it doesn't leak into other Axios API call tests
    jest.clearAllMocks();
  });

  test('Sanity check for AssignmentReports with report type grades', async ()=> {
    const responseData = [
      {
        _id: "evjMwcnne9frjZcYY",
        userId: "MNZtvxJYmY5GQ4w6z",
        score: 3
      },
      {
        _id: "EA62rNtPFuc36R6yT",
        userId: "jdGGwy2z58RCrmQCh",
        score: 3
      }
    ];
    //needed so that axios doesn't return undefined as its response
    axios.post.mockResolvedValue({ data: responseData });

    const courseId = 'BRhk8oFtsmnsBHKo4';
    const assignmentId = 'qB83qbw8vnAPYNEwm';
    const reportType = 'Grades';
    const reportPage = '1';
    const response = await axios.post('/api/assignment_analytics', {'_CID': courseId, '_AID': assignmentId, '_REP': reportType, '_P': reportPage});

    expect(response.data).toEqual(responseData);
  });

  test('sanity check for CourseDataPage', async ()=> {
    const responseData = {
      _id: 'BRhk8oFtsmnsBHKo4',
      name: 'Textbook Team',
      instructorIds: ['yj6ngEo5ybTevTDag', 'ba8FE5bnAZtB6x254'],
      studentIds: ['MNZtvxJYmY5GQ4w6z', 'jdGGwy2z58RCrmQCh', 'XH7rtnv44jtkRcBEr'],
      inactiveStudentIds: [],
      lti: {
        version: '1.1',
        institutionId: '9RFriSoEyL8PuvJh6',
        instanceId: '7db438071375c02373713c12c73869ff2f470b68.k-state.instructure.com',
        contextId: '97b4be803cd06efa24f5f02dbc008e8917103cc6',
        lmsName: 'canvas'
      },
      lowestPossibleScore: 0,
      highestPossibleScore: 3,
      ltiInstanceId: '7db438071375c02373713c12c73869ff2f470b68.k-state.instructure.com',
      ltiContextId: '97b4be803cd06efa24f5f02dbc008e8917103cc6'
    };

    axios.post.mockResolvedValue({ data: responseData });

    const userId = 'BRhk8oFtsmnsBHKo4';
    const response = await axios.post('/api/course_data', { '_CID': userId });

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });

  test('sanity check for AssignmentAnnotationsPage', async ()=> {
    const responseData = [{
      id: 'wH3HSnFqwE39LugBs',
      studentId: 'jdGGwy2z58RCrmQCh',
      text: '<p>Needs to be hard</p>',
      plainText: 'Needs to be hard',
      score: 0,
      createdAt: '2023-10-25T15:01:21.605Z',
      editedAt: '2023-10-25T15:01:21.605Z'
    }];

    axios.post.mockResolvedValue({ data: responseData });

    const courseId = 'BRhk8oFtsmnsBHKo4';
    const assignmentId = 'qB83qbw8vnAPYNEwm';
    const response = await axios.post('/api/assignment_annotations', {'_CID': courseId, '_AID': assignmentId});

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });

  test('sanity check for AssignmentGradesPage', async ()=> {
    const responseData =  [{
      studentId: 'MNZtvxJYmY5GQ4w6z',
      score: 3,
      released: true
    },
    {
      studentId: 'jdGGwy2z58RCrmQCh',
      score: 3,
      released: true
    },
    {
      studentId: 'ba8FE5bnAZtB6x254',
      released: true
    },
    {
      studentId: 'yj6ngEo5ybTevTDag',
      released: true
    },
    {
      studentId: 'XH7rtnv44jtkRcBEr',
      score: null,
      released: true
    }];
    axios.post.mockResolvedValue({ data: responseData });

    const courseId = 'BRhk8oFtsmnsBHKo4';
    const response = await axios.post('/api/course_assignments', {'_CID': courseId});

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });

  test('sanity check for CourseAssignmentInfoPage', async ()=> {
    const responseData =  [{
      _id: 'qB83qbw8vnAPYNEwm',
      name: 'K-State CIS 642_643 Textbook - Pages 1-11',
      documentIds: [
          "iRvEpfcv9r9ecrEsE"
      ],
      deadline: '2023-10-25T16:30:00.000Z',
      assignTo: 'all',
      studentIds: [
          'MNZtvxJYmY5GQ4w6z',
          'jdGGwy2z58RCrmQCh',
          'XH7rtnv44jtkRcBEr'
      ]
    },
    {
      _id: 'dQNPoRBd2PBH52ABp',
      name: 'Coding Assignment',
      documentIds: [
          'ADzMrbFTYtKmvrnAk',
          'aE8M4oW8e9nEhSnLd'
      ],
      deadline: '2023-10-27T15:30:00.000Z',
      assignTo: 'all',
      studentIds: [
          'MNZtvxJYmY5GQ4w6z',
          'jdGGwy2z58RCrmQCh',
          'XH7rtnv44jtkRcBEr'
      ]
    }];
    axios.post.mockResolvedValue({ data: responseData });

    const courseId = 'BRhk8oFtsmnsBHKo4';
    const assignmentId = 'qB83qbw8vnAPYNEwm';
    const response = await axios.post('/api/assignment_grades', {'_CID': courseId, '_AID': assignmentId});

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });

  test('sanity check for InstitutionCoursesPage', async ()=> {
    const responseData = [
      {
        _id: 'BRhk8oFtsmnsBHKo4',
        name: 'Textbook Team'
      },
      {
        _id: 'vv3ooxA3SCsHDpiRc',
        name: 'LTI Testing'
      }
    ];
    
    axios.get.mockResolvedValue({ data: responseData });

    const response = await axios.get('/api/institution_courses');

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });

  test('sanity check for InstitutionRosterPage', async ()=> {
    const responseData = [
      {
        _id: 'MNZtvxJYmY5GQ4w6z',
        firstName: 'Nicholas',
        lastName: 'Sternecker',
        email: 'nsternecker@ksu.edu'
      },
      {
        _id: 'QrALMiztKSx3YzDTv',
        firstName: 'Student',
        lastName: 'Gibson',
        email: 'gibson.williams2020@gmail.com'
      },
      {
        _id: 'XH7rtnv44jtkRcBEr',
        firstName: 'Test',
        lastName: 'Student',
        email: 'student+LQRXWcdc4PpjY72bf@perusall.com'
      },
      {
        _id: 'ba8FE5bnAZtB6x254',
        firstName: "Nate",
        lastName: 'Lillich',
        email: 'nlillich@ksu.edu'
      },
      {
        _id: 'jdGGwy2z58RCrmQCh',
        firstName: 'Nathan',
        lastName: 'Herscovici',
        email: 'nherscovici@ksu.edu'
      },
      {
        _id: 'yj6ngEo5ybTevTDag',
        firstName: 'Gibson',
        lastName: 'Williams',
        email: 'gibbs060502@ksu.edu'
      }
    ];

    axios.get.mockResolvedValue({ data: responseData });

    const response = await axios.get('/api/institution_roster');

    //expects current result to equal api result
    expect(response.data).toEqual(responseData);
  });


});



//#endregion
