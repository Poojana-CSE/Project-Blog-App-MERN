import React, { useState, useContext } from 'react';
import { UserContext } from '../../UserContext';
import { Navigate, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';
import './HomePage'

const LoginPage = ({setProfilename}) => {
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const navigate = useNavigate(); // Define navigate using useNavigate

    async function login(e) {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/login', {
                method: 'POST',
                body: JSON.stringify({ username: userName, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.ok) {
                const userInfo = await response.json();
                setUserInfo(userInfo);
                console.log(userInfo.username)
                setProfilename(userInfo.username)
                setMessage("Login Successful");
                setRedirect(true);
            } else {
                setMessage("Invalid User Name Or Password");
            }
        } catch (err) {
            console.log("Error During Login ", err);
            setMessage("Login Failed");
        }
    }

    if (redirect) {
        console.log("Redirecting to home page...");
        return <Navigate to="/home"></Navigate>;
    }

    return (
        <div className="logMain">
            <form onSubmit={login} className="logForm">
                {/* Cross Button */}
                <button
                    type="button"
                    className="closeButton"
                    onClick={() => navigate('/')} // Use navigate to redirect
                >
                    &#x2715;
                </button>

                <fieldset>
                    <div className="logHead">
                        <h4>Connect To...</h4>
                    </div>
                    <div className="logElements">
                        <label className="loglabel">User Name: </label>
                        <input
                            className="loginput"
                            placeholder="(Mail/Phone Number)"
                            value={userName}
                            type="text"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="loglabel">Password:</label>
                        <input
                            className="loginput"
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="logSubmit">
                        <button className='logButton'>Join</button>
                    </div>
                    <div className="logMessage">{message && <p>{message}</p>}</div>

                    <div className="logNavigate">
                        <p>
                            New To Bloggy? <Link to="/register">Create Account</Link>
                        </p>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

export default LoginPage;
