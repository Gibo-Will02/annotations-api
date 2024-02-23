
import { render, screen, fireEvent, getByPlaceholderText, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App';
import renderer from "react-test-renderer";
import { JSX } from 'react/jsx-dev-runtime';
//const CourseDataPage = require('../src/views/CourseDataPage');
import CourseDataPage from '../src/views/CourseDataPage';
import InstitutionCoursesPage from '../src/views/InstitutionCoursesPage';
import InstitutionRosterPage from '../src/views/InstitutionRosterPage';
import CourseAssignmentInfoPage from '../src/views/CourseAssignmentInfoPage';
import axios from "axios";

//axios.defaults.baseURL = "http://localhost:3000/";
jest.mock('axios');

//#region course data page tests
describe("Jest Snapshot testing suite", () => {
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
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds', async ()=> {
    
    const responseData = {
      name: 'Test Course',
      _id: '123',
      instructorIds: ['456', '789'],
      studentIds: ['abc', 'def'],
    };
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
    //expect(await getByText('Textbook Team')).toBeInTheDocument();
    
  });
  
  
  /*
  test('renders failstate when no person is found', async ()=> {
    
    render(<CourseDataPage />);
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('No instructor IDs available')).toBeInTheDocument();
    expect(await screen.findByText('No student IDs available')).toBeInTheDocument();
  });
  */
});
//#endregion


//#region Institution courses page tests


describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const instPage = renderer.create(<InstitutionCoursesPage />).toJSON();
    expect(instPage).toMatchSnapshot();
  });
});



describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  //tests the display if has data
  test('renders info when API call succeeds institute courses', async ()=> {
    const responseDataTwo = [
      { _id: '3', name: 'Test Installment' },
      { _id: '4', name: 'False life high' }
    ];
    axios.get.mockResolvedValueOnce({ data: responseDataTwo });

    
    const { getByText } = render(<InstitutionCoursesPage />);
    //fireEvent.click();

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(0);
      //expect(axios.post).toHaveBeenCalledWith('/api/institution_courses');
    });
    
    //const TextElement = getByText("Perusall API Course Return:");
    //expect(TextElement).T;


  });

});

//#endregion

//#region Institution Roster page Tests

describe('Api sends information through', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders info when API call succeeds', async ()=> {
    
    const responseData = [
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
      { _id: '2', firstName: 'Noah', lastName: 'way', email: 'nway@bht.com' },
    ];
    axios.get.mockResolvedValueOnce({ data: responseData });
    
    const page = render(<InstitutionRosterPage />);
    const { getByText } = page;

    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith('/api/institution_roster');
    });
    
    expect(getByText('Perusall API User Return:')).toBeInTheDocument();
    expect(page).toMatchSnapshot();
    //expect(getByText('ID: 1 / First Name: John / Last Name: Doe / Email: john@example.com')).toBeInTheDocument();
    //expect(getByText('ID: 1 / First Name: Noah / Last Name: way / Email: nway@bht.com')).toBeInTheDocument();
    //expect(await screen.findByText('Nicholas')).toBeInTheDocument();
    //expect(await screen.findByText('Sternecker')).toBeInTheDocument();
    //expect(await screen.findByText('nsternecker@ksu.edu')).toBeInTheDocument();
  });

  
});


//#endregion

//#region user course list page tests

describe("Jest Snapshot testing suite", () => {
  it("Matches CourseAssignmentPage Snapshot", () => {
    const uscPage = render(<CourseAssignmentInfoPage />);
    //const t = uscPage.toJSON();
    expect(uscPage).toMatchSnapshot();
  });
});



describe('Api Testing using Fake Data', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders info when API call succeeds for CourseAssignInfo', async ()=> {
    
    const responseData = {
      name: 'Test Course',
      _id: '123',
      instructorIds: [],
      studentIds: ['abc', 'def'],
    };
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


    //expect(await screen.findByText('Name:')).toBeInTheDocument();
    //expect(await screen.findByText('Assignment ID:')).toBeInTheDocument();
    //expect(await screen.findByText('Deadline:')).toBeInTheDocument();

  });

  
});

//#endregion


