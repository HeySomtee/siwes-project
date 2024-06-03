import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Nav from './Components/Nav'
import LeftSideBar from './Components/LeftSideBar'
import ContentArea from './Components/ContentArea'
import RightSideBar from './Components/RightSideBar'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import SignUP from './Components/SignUP';
import { useLocalStorageSelections } from './Components/SubComponents/utils';



function App() {
  const [data, setData] = useState([])
  const [betDate, setBetDate] = useState([])
  const [resultCount, setResultCount] = useState(null)
  const storageKey = 'slipSelections';
  const { localStorageItems, setLocalStorageItems, betSlip, addToSlip } = useLocalStorageSelections(storageKey, data);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payLoad, setPayLoad] = useState([])
  const accessToken = localStorage.getItem('access_token');
  const [registeredBets, setRegisteredBets] = useState([])
  //TODO have a state for user id then call mongodb api and use it to fill my react template or pass a state from local storage fro, rather than having to fetch from my py-server

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/data/', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/login';
          }
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        processData(jsonData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const intervalId = setInterval(() => {
      fetchData();
    }, 15000);
    
    return () => clearInterval(intervalId);

  }, [accessToken]);

  const processData  = (newData) => {
    const Matches = newData.matches
    const count = newData.resultSet.count 
    const date = newData.filters
    setData(Matches)
    setBetDate(date)
    setResultCount(count)
  } 

  useEffect(() => {  
    const fetchUserBets = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/user/bets', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })

        const userBetsList = response.data;
        setRegisteredBets(userBetsList.user_bets);
      } catch (error) {
        console.error('Error fetching data:', error);

      }
    }

    fetchUserBets();
  }, [data, accessToken])
  
  

  return (
    <>
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
          {/* <br /> */}
          <Route
            path="*"
            element={
              isAuthenticated || localStorage.getItem('access_token') ? (
                <>
                  <Nav />
                  <br />
                  <div className="flex justify-around w-screen py-2">
                    <LeftSideBar />
                    <ContentArea
                      data={data}
                      setData={setData}
                      localStorageItems={localStorageItems}
                      addToSlip={addToSlip}
                      resultCount={resultCount}
                      setRegisteredBets={setRegisteredBets}
                    />
                    <RightSideBar
                      data={data}
                      betDate={betDate}
                      setData={setData}
                      localStorageItems={localStorageItems}
                      setLocalStorageItems={setLocalStorageItems}
                      addToSlip={addToSlip}
                      betSlip={betSlip}
                      registeredBets={registeredBets}
                      setRegisteredBets={setRegisteredBets}
                    />
                  </div>
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;