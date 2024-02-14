
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
//import App from '../src/App';
import renderer from "react-test-renderer";
import { JSX } from 'react/jsx-dev-runtime';
//const CourseDataPage = require('../src/views/CourseDataPage');
import CourseDataPage from '../src/views/CourseDataPage';
import InstitutionCoursesPage from '../src/views/InstitutionCoursesPage';
import InstitutionRosterPage from '../src/views/InstitutionRosterPage';
import UserCourseListPage from '../src/views/UserCourseListPage';

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

describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  //untestable currently
  test('renders info when API call succeeds', async ()=> {
    const fakeUsers = [
      {_id: 1 , instructorIds: 'Jack'},
      {_id: 2 , studentIds: 'Noah'},
    ];
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) });

    render(<CourseDataPage />);
    //const input = screen.getByPlaceholderText('Enter the course id:');
    //const value = 'blank';
    /* when text input is needed
    fireEvent.change(input, {
      target: {value}
    });
    */
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('Jack')).toBeInTheDocument();
    expect(await screen.findByText('Noah')).toBeInTheDocument();
  });

  
  
  test('renders failstate when no person is found', async ()=> {
    
    render(<CourseDataPage />);
    //const input = screen.getByPlaceholderText('Enter the course id:');
    //const value = 'blank';
    /*
    fireEvent.change(input, {
      target: {value}
    });
    */
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('No instructor IDs available')).toBeInTheDocument();
    expect(await screen.findByText('No student IDs available')).toBeInTheDocument();
  });
  
});
//#endregion

//#region Institution courses page tests


describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const instPage = renderer.create(<InstitutionCoursesPage />).toJSON();
    expect(instPage).toMatchSnapshot();
  });
});

//wont function yet
describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  //tests the display if has data
  test('renders info when API call succeeds', async ()=> {
    const fakeUsers = [
      {_id: 1 , name: 'Jack Mayfeild'},
      {_id: 2 , name: 'Noah Way'},
    ];
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) });

    render(<InstitutionCoursesPage />);
    
    const TextElement = screen.getByText("Perusall API Course Return:");
    expect(TextElement.toBeInTheDocument());
    expect(await screen.findByText('Jack Mayfeild')).toBeInTheDocument();
    expect(await screen.findByText('Noah Way')).toBeInTheDocument();
  });

  
  

});
//#endregion

//#region Institution Roster page Tests
describe("Jest Snapshot testing suite", () => {
  it("Matches InstitutionRosterPage Snapshot", () => {
    const rosPage = renderer.create(<InstitutionRosterPage />).toJSON();
    expect(rosPage).toMatchSnapshot();
  });
});

test('Institution courses page has its text', ()=> {
  render(<InstitutionRosterPage />);
  const TextElement = screen.getByText("Perusall API User Return:");
  expect(TextElement).toBeInTheDocument();
});

//doesn't function yet
describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  test('renders info when API call succeeds', async ()=> {
    const fakeUsers = [
      {_id: 1 , firstName: 'Jack', lastName: 'Bicker', email: 'JBiker@nou.com'},
      {_id: 2 , firstName: 'Noah', lastName: 'Way', email: 'NWay2@nuhuh.com'},
    ];
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) });

    render(<InstitutionRosterPage />);

    expect(await screen.findByText('Jack')).toBeInTheDocument();
    expect(await screen.findByText('Bicker')).toBeInTheDocument();
    expect(await screen.findByText('JBiker@nou.com')).toBeInTheDocument();
    expect(await screen.findByText('Noah')).toBeInTheDocument();
    expect(await screen.findByText('Way')).toBeInTheDocument();
    expect(await screen.findByText('NWay2@nuhuh.com')).toBeInTheDocument();
  });

  
});


//#endregion

//#region user course list page tests

describe("Jest Snapshot testing suite", () => {
  it("Matches InstitutionRosterPage Snapshot", () => {
    const uscPage = renderer.create(<UserCourseListPage />).toJSON();
    expect(uscPage).toMatchSnapshot();
  });
});

//doesn't function yet
describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  test('renders info when API call succeeds', async ()=> {
    const fakeUsers = [
      {_id: 1 , firstName: 'Jack', lastName: 'Bicker', email: 'JBiker@nou.com'},
      {_id: 2 , firstName: 'Noah', lastName: 'Way', email: 'NWay2@nuhuh.com'},
    ];
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) });

    render(<UserCourseListPage />);

    expect(await screen.findByText('Jack')).toBeInTheDocument();
    expect(await screen.findByText('Bicker')).toBeInTheDocument();
    expect(await screen.findByText('JBiker@nou.com')).toBeInTheDocument();
    expect(await screen.findByText('Noah')).toBeInTheDocument();
    expect(await screen.findByText('Way')).toBeInTheDocument();
    expect(await screen.findByText('NWay2@nuhuh.com')).toBeInTheDocument();
  });

  
});
//#endregion

