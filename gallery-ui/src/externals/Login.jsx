import { React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToastContainer, toast } from 'react-toastify';



function Login({ setIsAuthenticated, setPayLoad, payLoad }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(0);
  const [statusVal, setStatusVal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const notify = () => toast(responseMessage);

  useEffect(() => {
     responseMessage ? notify() : ''
  }, [responseMessage]);
 
  const handleLogin = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      const responseStatus = response.status;
      setStatus(responseStatus);
      setResponseMessage(responseData.res);
      localStorage.setItem('access_token', responseData.access_token);
      
      const token = responseData.access_token
      const [header, payload, signature] = token.split('.');      
      const decodedPayload = JSON.parse(atob(payload));
      setPayLoad(decodedPayload);

      showLoader();

      if (response.ok && responseStatus === 223 && localStorage.getItem('access_token')) {
        setIsAuthenticated(true);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    } finally {
      showLoader();
    }
  };

  const showLoader = () => {
    setStatusVal((prev) => !prev);
  };
  return (
    <div className="login-body">
      <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition: Bounce
        />
    <div className='form-container'>
      <div className='form-div'>
        <h1 className='text-lg'><b>Login</b></h1>
        <small>don't have an account?  
          <span 
            style={{
              textDecoration: 'underline',
            }}
            onClick={() => {navigate('/signup')}}
            >
              signup
          </span>
        </small>
        <br /> <br />
        <form>
          <label htmlFor="email"><h3>Email Address</h3></label>
          <input className='input' type="text" name='email' onChange={(e) => {setEmail(e.target.value)}} />
          <br /> <br />
          <label htmlFor="password"><h3>Password</h3></label>
          <input className='input' type="text" name='password'  onChange={(e) => {setPassword(e.target.value)}}/>
        </form>
        <div className='flex justify-between f'>
          <input className='check' type="checkbox" name="" id="check" /> <span>Remember me</span>
        </div>

          <p
            className='p-4 text-green-500 flex'
            style={{
              color: status === 222 ? 'red' : ''
            }}
          >
            {responseMessage} 
            <span style={{
              color: '#fff',
              textDecoration: 'underline',
              display: status === 222 ? 'block' : 'none'
            }} onClick={() => {navigate('/signup')}}
            >
              sign up?
            </span>
          </p> 
        <button className='login-btn' onClick={handleLogin}>
          <span
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
            ><FontAwesomeIcon icon="fa-arrows-rotate" /></span>
          </span>
        </button>
      </div>
      
    </div>
  </div>
  )
}

export default Login