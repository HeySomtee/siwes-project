import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';

function Login({ setIsAuthenticated, setPayLoad, payLoad }) {
  const [twitterUsername, setTwitterUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(0);
  const [statusVal, setStatusVal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ twitterUsername, password }),
      });

      const responseData = await response.json();
      const responseStatus = response.status;
      setStatus(responseStatus);
      setResponseMessage(responseData.res);
      localStorage.setItem('twitterUsername', responseData.twitterUsername);
      localStorage.setItem('discordId', responseData.discordId);
      // localStorage.setItem('access_token', responseData.access_token);

      // const token = responseData.access_token
      const [header, payload, signature] = token.split('.');
      const decodedPayload = JSON.parse(atob(payload));
      setPayLoad(decodedPayload);
      navigate('/')

      showLoader();
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const showLoader = () => {
    setStatusVal((prev) => !prev);
  };

  return (
    <div className="login-body">
      <div className='form-container'>
        <div className='form-div'>
          <h1 className='text-lg'><b>Login</b></h1>
          <small>don't have an account?
            <span
              style={{
                textDecoration: 'underline',
              }}
              onClick={() => { navigate('/signup') }}
            >
              signup
            </span>
          </small>
          <br /> <br />
          <form className='login-form'>
            <label htmlFor="twitter">
              <h3>Twitter Username</h3>
            </label>
            <input
              className="input"
              type="text"
              name="twitter"
              onChange={(e) => setTwitterUsername(e.target.value)}
            />
            <br /> <br />
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              className='input'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>

          <p
            className='p-4 text-green-500 flex'
            style={{
              color: status === 401 ? 'red' : ''
            }}
          >
            {responseMessage}
            <span style={{
              color: '#fff',
              textDecoration: 'underline',
              display: status === 401 ? 'block' : 'none'
            }} onClick={() => { navigate('/signup') }}
            >
              sign up?
            </span>
          </p>
          <button className='login-btn' onClick={handleLogin}>
            <span
              className='text-white'
              style={{
                display: statusVal === true ? 'none' : 'block'
              }}
              onClick={showLoader}
            >
              Login
            </span>
            <span className=''>
              <span
                className='Oauth-preloader'
                style={{
                  display: statusVal === true ? 'block' : 'none',
                  animationName: 'rotate'
                }}
              ></span>
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login;
