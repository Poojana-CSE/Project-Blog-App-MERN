import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationPage.css';

const RegistrationPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      body: JSON.stringify({ username: userName, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      setMessage('Registration Successful!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } else if (response.status === 400) {
      setMessage('User Already Exists!');
    } else {
      setMessage('Registration Failed');
    }
  }

  return (
    <div className="regMain">
      <form onSubmit={register} className="regForm">
        {/* Cross Button */}
        <button
          type="button"
          className="closeButton"
          onClick={() => navigate('/')}
        >
          &#x2715;
        </button>

        <fieldset>
          <div className="regHead">
            <h4>Join With Me.</h4>
          </div>
          <div className="regElements">
            <label className="reglabel">User Name: </label>
            <input
              className="reginput"
              placeholder="(Mail/Phone Number)"
              value={userName}
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="reglabel">Password:</label>
            <input
              className="reginput"
              placeholder="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="regSubmit">
            <button className='regButton'>Join</button>
          </div>
          <div className="regMessage">{message && <p>{message}</p>}</div>

          <div className="regNavigate">
            <p>
              Already Have an Account? <Link to="/login">Login</Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default RegistrationPage;

