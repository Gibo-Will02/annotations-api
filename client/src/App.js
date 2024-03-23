import logo from './logo.svg';
import './App.css';
import InstitutionRosterPage from './views/InstitutionRosterPage';
import CourseAssignmentInfoPage from './views/CourseAssignmentInfoPage';
import InstitutionCoursesPage from './views/InstitutionCoursesPage';
import CourseDataPage from './views/CourseDataPage';
import AssignmentGradesPage from './views/AssignmentGradesPage';
import AssignmentAnnotationsPage from './views/AssignmentAnnotationsPage';
import AssignmentReportsPage from './views/AssignmentReportsPage';
import Navbar from './components/NavBar/index';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

let config = {
  headers: {
    'Access-Control-Allow-Origin': '*', //Don't need anymore
  }
}

/**
 * The App that will be shown upon start up of the application
 * @returns React component to be viewed
 */
function App() {
  const [user, setUser] = useState(undefined);

  // This useEffet fetches the current user from the API server.
  // If there is no user yet, then we load the login page from 
  // the API server by directly setting the url in the browser.
  useEffect(() => {
    console.log(user) //Don't need logs
    if (!user) {
      console.log("Inside !user conditional") //Don't need logs
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
    <div className="App">
      <h1 style={{backgroundColor: "lightgray", display:"flex", flexDirection:"column", alignItems: "center"}}>
        <label>Welcome {user.username}!
          <a href="/api/logout">Logout</a>
        </label>
      </h1>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/institutionRosterPage' element={<InstitutionRosterPage />} />
          <Route path='/courseAssignmentInfoPage' element={<CourseAssignmentInfoPage />} />
          <Route path='/institutionCoursesPage' element={<InstitutionCoursesPage />} />
          <Route path='/courseDataPage' element={<CourseDataPage />} />
          <Route path='/assignmentGradesPage' element={<AssignmentGradesPage />} />
          <Route path='/assignmentAnnotationsPage' element={<AssignmentAnnotationsPage />} />
          <Route path='/assignmentReportsPage' element={<AssignmentReportsPage />} />
         </Routes>
       </Router>
    </div>
  );
}

export default App;
