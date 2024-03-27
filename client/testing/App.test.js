
import { render, screen, fireEvent, getByPlaceholderText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
//import userEvent from "@testing-library/user-event";
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
import axios from "axios";


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
    fireEvent.click(screen.getByText("Report Type"));
    fireEvent.click(screen.getByText("Page Views"));
    

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
    fireEvent.click(screen.getByText("Report Type"));
    fireEvent.click(screen.getByText("Student Activity"));
    

    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    expect(inputThree.value).toBe('0');
    //const cdpButton1 = getByText('Search Assignment');
    //fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
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
    
    fireEvent.click(screen.getByText("Report Type"));
    fireEvent.click(screen.getByText("Grades"));
    

    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    expect(inputTwo.value).toBe('qB83qbw8vnAPYNEwm');
    expect(inputThree.value).toBe('0');
    //const cdpButton1 = getByText('Search Assignment');
    //fireEvent.click(cdpButton1);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/api/assignment_analytics', {'_CID': 'BRhk8oFtsmnsBHKo4', '_AID': 'qB83qbw8vnAPYNEwm', '_REP': 'grades', '_P': '0'});
    });

  });

});
//#endregion
