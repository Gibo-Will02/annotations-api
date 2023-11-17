import logo from './logo.svg';
import './App.css';
import TestPage from './views/TestPage';
import Navbar from './components/NavBar/index';
import { BrowserRouter as Router, Routes, Route, useHref }
    from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

let config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  }
}

function App() {
  const [user, setUser] = useState(undefined);

  // This useEffet fetches the current user from the API server.
  // If there is no user yet, then we load the login page from 
  // the API server by directly setting the url in the browser.
  useEffect(() => {
    console.log(user)
    if (!user) {
      console.log("Inside !user conditional")
      fetch('/api/whoami')
      .then(response => response.json())
      .then(user => setUser(user))
      .catch(err => window.location = "/api/login")
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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/testpage' element={<TestPage />} />
         </Routes>
       </Router>
      <header className="App-header">
        <p>Welcome {user.username}! You are authenticated :</p>
        <a href="/api/logout">Logout</a>
      </header>
    </div>
  );
  // useEffect(() => {
  //   axios.get('/api', config).then(response => console.log(response.json()))
  // }, [])
  // // if (loggedIn) {
  //   return (
  //     <Router>
  //       <Navbar />
  //       <Routes>
  //         <Route path='/testpage' element={<TestPage />} />
  //       </Routes>
  //     </Router>
  //   );
  //}
  // else {
  //   return(
  //     <>
  //       <p>Please login test</p>
  //     </>
  //   )
  // }
  
}

export default App;
