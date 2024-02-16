
import { render, screen, fireEvent, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
//import App from '../src/App';
import renderer from "react-test-renderer";
import { JSX } from 'react/jsx-dev-runtime';
//const CourseDataPage = require('../src/views/CourseDataPage');
import CourseDataPage from '../src/views/CourseDataPage';
import InstitutionCoursesPage from '../src/views/InstitutionCoursesPage';
import InstitutionRosterPage from '../src/views/InstitutionRosterPage';
import CourseAssignmentInfoPage from '../src/views/CourseAssignmentInfoPage';



//#region course data page tests
describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<CourseDataPage wait />).toJSON();
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
  
  test('renders info when API call succeeds',  ()=> {
    const page = render(<CourseDataPage />);
    const { getByPlaceholderText } = page;
    const myinput = getByPlaceholderText('Course Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    const cdpButton1 = screen.getByText('Search Course');
    fireEvent.click(cdpButton1);
    
    expect(screen.findByText('Textbook Team')).toBeInTheDocument();

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
  it("Matches DOM Snapshot", () => {
    const instPage = renderer.create(<InstitutionCoursesPage showAfterDelay={500} />).toJSON();
    expect(instPage).toMatchSnapshot();
  });
});



//useEffect isn't working
describe('Api Testing using Fake Data', () => {
  //tests the display if has data
  test('renders info when API call succeeds', ()=> {
    render(<InstitutionCoursesPage />);
    window.location.reload();
    const TextElement = screen.getByText("Perusall API Course Return:");
    expect(TextElement).toBeInTheDocument();

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

//responce exists but expirences a network error
describe('Api sends information through', () => {
  //responce goes through but nothing is displayed
  test('renders info when API call succeeds', async ()=> {
    render(<InstitutionRosterPage />);
    window.location.reload();

    expect(await screen.findByText('Nicholas')).toBeInTheDocument();
    expect(await screen.findByText('Sternecker')).toBeInTheDocument();
    expect(await screen.findByText('nsternecker@ksu.edu')).toBeInTheDocument();
  });

  
});


//#endregion

//#region user course list page tests

describe("Jest Snapshot testing suite", () => {
  it("Matches CourseAssignmentPage Snapshot", () => {
    const uscPage = renderer.create(<CourseAssignmentInfoPage />).toJSON();
    expect(uscPage).toMatchSnapshot();
  });
});

//doesn't function yet

describe('Api Testing using Fake Data', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })

  test('renders info when API call succeeds', async ()=> {
    
    const page = render(<CourseAssignmentInfoPage />);
    const { getByPlaceholderText } = page;
    const myinput = getByPlaceholderText('Course Id Here');

    fireEvent.change(myinput, {
      target: {value: 'BRhk8oFtsmnsBHKo4' }
    });
    expect(myinput.value).toBe('BRhk8oFtsmnsBHKo4');
    const cdpButton1 = screen.getByText('Search Course');
    fireEvent.click(cdpButton1);


    expect(await screen.findByText('Name:')).toBeInTheDocument();
    expect(await screen.findByText('Assignment ID:')).toBeInTheDocument();
    expect(await screen.findByText('Deadline:')).toBeInTheDocument();

  });

  
});

//#endregion


