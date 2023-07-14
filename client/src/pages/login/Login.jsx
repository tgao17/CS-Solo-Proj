import React, { useState, useEffect } from 'react';
const Login = ({ setIsLoggedIn }) => {
  const [UN, setUN] = useState('');
  const [PW, setPW] = useState('');
  const [incorrect, setIncorrect] = useState('');
  //   const [authenticate, setAuthenticate] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: UN, password: PW }),
      });
      console.log(response);
      const data = response.json();
      if (response.ok) {
        console.log('Frontend Login successful');
        setIsLoggedIn(true);
      } else {
        console.log('Frontend Login unsuccesful');
        setIncorrect('Incorrect combination. Try again.');
      }
    } catch (err) {
      console.error('Error in Frontend Login');
    }
  };

  const submit = () => {
    console.log(UN);
    console.log(PW);
    handleLogin();
  };

  return (
    <div className="box">
      <div className="welcome">
        <h2 className="welcome">Welcome to Maply</h2>
        <div>Welcome Back! </div>
      </div>

      <div>Username: </div>
      <input
        className="input"
        value={UN}
        onChange={(e) => setUN(e.target.value)}
      />
      <div>Password: </div>
      <input
        type="password"
        className="input"
        value={PW}
        onChange={(e) => setPW(e.target.value)}
      />
      <div className="incorrect">{incorrect}</div>
      <button className="yellowButton" id="homeButtons" onClick={submit}>
        Login
      </button>
    </div>
  );
};

export default Login;
