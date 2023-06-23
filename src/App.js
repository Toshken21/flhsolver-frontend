import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/register/register';
import LoginPage from './pages/login/login';
import HomePage from './pages/home/home';


function App() {
  return (
    <div>
      {/*Routes for the web-app*/}
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>}>
            
          </Route>
          <Route exact path="/register" element={<RegisterPage/>}>
            
          </Route>

          <Route exact path="/homepage" element={<HomePage/>}>


          </Route>





          


        </Routes>
      </Router>
    </div>

  );
}

export default App;