import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUP from './Components/SignUP';
import PhotoScreen from './Components/PhotoScreen'
import Feed from './Components/Feed';
import Upload from './Components/Upload';
import UserProfile from './Components/UserProfile';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payLoad, setPayLoad] = useState([])
  const [isUploadPage, setIsUploadPage] = useState(false)
  const accessToken = localStorage.getItem('access_token');

  return (
    <div className='roboto-regular'>
      <Router>
        <Routes>
          <Route path="/login" element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              payLoad={payLoad}
              setPayLoad={setPayLoad}
            />
          }
          />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/upload" element={
            <Upload 
              setIsUploadPage={setIsUploadPage}
              isUploadPage={isUploadPage}
            />
          } 
          />
          <Route
            path="/"
            element={
              isAuthenticated || localStorage.getItem('access_token') ? (
                <>
                  <Feed
                    setIsUploadPage={setIsUploadPage}
                    isUploadPage={isUploadPage}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;