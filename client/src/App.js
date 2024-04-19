import logo from './logo.svg';
import './App.css';
import 'primeicons/primeicons.css';
import CourseAssignmentInfoPage from './views/CourseAssignmentInfoPage';
import InstitutionCoursesPage from './views/InstitutionCoursesPage';
import CourseDataPage from './views/CourseDataPage';
import AssignmentGradesPage from './views/AssignmentGradesPage';
import AssignmentAnnotationsPage from './views/AssignmentAnnotationsPage';
import AssignmentReportsPage from './views/AssignmentReportsPage';
import InstitutionDataPage from './views/InstitutionDataPage';
import MockAssignmentAnalytics from './views/MockAssignmentAnalytics';
import MockCourseDataDropdown from './components/MockCourseDataDropdown';
import MockAssignmentPageAnalytics from './views/MockAssignmentPageAnalytics';
import Navbar from './components/NavBar/index';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ToggleButton } from 'primereact/togglebutton';

/**
 * The App that will be shown upon start up of the application
 * @returns React component to be viewed
 */
function App() {
  //User variable is used to store the user after a successful login, allowing access to the site
  const [user, setUser] = useState(undefined);

  //toggleDarkMode varaible used to switch between dark and light mode
  const [toggleDarkMode, setToggleDarkMode] = useState(true);

  // This useEffet fetches the current user from the API server.
  // If there is no user yet, then we load the login page from 
  // the API server by directly setting the url in the browser.
  useEffect(() => {
    console.log(user) //Don't need logs
    if (!user) {
      fetch('/api/whoami') //Switch this to axios or switch axios to base commands, reccomended to not use axios
      .then(response => {
        if (response.status == "403") {
          window.location = "/api/login";
        }else {
          response.json().then(user => setUser(user))
        }
      })
      .catch(err => {
        console.error(err);
        window.location = "/api/login";
      })
    }

  }, []);

  // Display a wait message or spinner if the user is 
  // not yet logged in.
  if(!user) return <h1>Please wait...</h1>

  // If the user is logged in, go ahead and render the app.
  // Note you may want to pass the user as props to children
  // components.
  return (
    <div className={toggleDarkMode ? "App App-dark-page": "App App-light-page"}>
      <h1 style={{display:"flex", flexDirection:"column", alignItems: "center"}}>
        <div>
          <label>Welcome {user.username}!
            <a href="/api/logout">Logout</a>
          </label>
        </div>
        <div style={{ position: 'absolute', right: 10 }}>
          <ToggleButton onLabel="Dark" offLabel="Light"
                checked={toggleDarkMode} onChange={(e) => setToggleDarkMode(e.value)} />
        </div>
      </h1>
      <div>
      <Router>
        <Navbar />
        <row style={{ display: 'flex' }}>
          <div>
            <MockCourseDataDropdown />
          </div>
          <div>
            <Routes>
              <Route path='/institutionDataPage' element={<InstitutionDataPage />} />
              <Route path='/courseAssignmentInfoPage' element={<CourseAssignmentInfoPage />} />
              <Route path='/institutionCoursesPage' element={<InstitutionCoursesPage />} />
              <Route path='/courseDataPage' element={<CourseDataPage />} />
              <Route path='/assignmentGradesPage' element={<AssignmentGradesPage />} />
              <Route path='/assignmentAnnotationsPage' element={<AssignmentAnnotationsPage />} />
              <Route path='/assignmentReportsPage' element={<AssignmentReportsPage />} />
              <Route path='/mockAssignmentAnalytics' element={<MockAssignmentAnalytics />} />
              <Route path='/mockAssignmentPageAnalytics' element={<MockAssignmentPageAnalytics />} />
            </Routes>
          </div>
        </row>
        <br />
       </Router>
      </div>
    </div>
  );
}

export default App;
