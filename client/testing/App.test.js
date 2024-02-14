
import { render, screen, fireEvent } from '@testing-library/react';
//import App from '../src/App';
import renderer from "react-test-renderer";
import { JSX } from 'react/jsx-dev-runtime';
//const CourseDataPage = require('../src/views/CourseDataPage');
import CourseDataPage from '../src/views/CourseDataPage';
//import InstitutionCoursesPage from '../src/views/InstitutionCoursesPage';
//import InstitutionRosterPage from '../src/views/InstitutionRosterPage';
//import UserCourseListPage from '../src/views/UserCourseListPage';


//#region course data page tests
describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<CourseDataPage />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});


test('course data page displays correct information', () => {
  const domTree = renderer.create(<CourseDataPage />).toJSON();
  expect(domTree.includes("Perusall API Course Return:"));
 

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

  test('renders info when API call succeeds', async ()=> {
    const fakeUsers = [
      {_id: 1 , instructorIds: 'Jack'},
      {_id: 2 , studentIds: 'Noah'},
    ];
    fetchMock.mockResolvedValue({ status: 200, json: jest.fn(() => fakeUsers) });

    render(<CourseDataPage />);
    const input = screen.getByPlaceholderText('Enter the course id:');
    const value = 'blank';
    fireEvent.change(input, {
      target: {value}
    });
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('Jack')).toBeInTheDocument();
    expect(await screen.findByText('Noah')).toBeInTheDocument();
  });

  
  
  test('renders failstate when no person is found', async ()=> {
    
    render(<CourseDataPage />);//replace
    const input = screen.getByPlaceholderText('Enter the course id:');
    const value = 'blank';
    fireEvent.change(input, {
      target: {value}
    });
    const nButton1 = screen.getByText('Search Course');
    fireEvent.click(nButton1);

    expect(await screen.findByText('No instructor IDs available')).toBeInTheDocument();
    expect(await screen.findByText('No student IDs available')).toBeInTheDocument();
  });
  
});
//#endregion


