import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';

function SignUP() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const lowerCaseEmail = email.toLowerCase();
      const lowerCaseTwitterUsername = twitterUsername.toLowerCase();
      const lowerCaseDiscordId = discordId.toLowerCase();

      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: lowerCaseEmail, password, twitterUsername: lowerCaseTwitterUsername, discordId: lowerCaseDiscordId }),
      });

      if (!response.ok) {
        throw new Error('Sign Up failed');
      }

      const responseData = await response.json();

      if (response.status === 200) {
        console.log(responseData.res);
        localStorage.setItem('twitterUsername', lowerCaseTwitterUsername);
        localStorage.setItem('discordId', lowerCaseDiscordId);
        navigate('/')
      }
    } catch (error) {
      console.error('Sign Up error:', error.message);
    }
  };


  return (
    <div className="login-body">
      <div className="form-container">
        <div className="form-div">
          <h1 className="text-lg">
            <b>Sign Up</b>
          </h1>
          <small>
            Have an account?{' '}
            <span
              style={{
                textDecoration: 'underline',
              }}
              onClick={() => {
                navigate('/login');
              }}
            >
              login
            </span>
          </small>
          <br /> <br />
          <form>
            <label htmlFor="email">
              <h3>Email Address</h3>
            </label>
            <input
              className="input"
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label htmlFor="password">
              <h3>Password</h3>
            </label>
            <input
              className="input"
              // type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br /> <br />
            <div className='flex text-center justify-between'>
              <div>
                <label htmlFor="twitter">
                  <h3>Username</h3>
                </label>
                <input
                  className="input"
                  type="text"
                  name="twitter"
                  onChange={(e) => setTwitterUsername(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label htmlFor="discord">
                  <h3>Reg no:</h3>
                </label>
                <input
                  className="input"
                  type="text"
                  name="discord"
                  onChange={(e) => setDiscordId(e.target.value)}
                />
              </div>
            </div>
          </form>
          <p
            className="p-4 text-green-500 flex"
            style={{
              color: status === 222 ? 'red' : '',
            }}
          >
            {responseMessage}
            <span
              style={{
                color: '#fff',
                textDecoration: 'underline',
                display: status === 222 ? 'block' : 'none',
              }}
              onClick={() => {
                navigate('/login');
              }}
            >
              login?
            </span>
          </p>
          <button className="sign-up login-btn" onClick={handleSignUp}>
            <span
              className='text-white'
            >
              Sign Up
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUP;
