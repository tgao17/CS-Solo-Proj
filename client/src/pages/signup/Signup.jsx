import React, { useState, useEffect } from 'react';

const Signup = ({ setIsLoggedIn }) => {
  const [UN, setUN] = useState('');
  const [PW, setPW] = useState('');
  const [incorrect, setIncorrect] = useState('  ');
  //   const [authenticate, setAuthenticate] = useState(false);
  const handleSignup = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: UN, password: PW }),
      });
      console.log(response);
      if (response.ok) {
        console.log('Frontend Sign Up successful');
        setIsLoggedIn(true);
      } else {
        console.log('Frontend Sign Up unsuccesful');
        setIncorrect('Username is taken.');
      }
    } catch (err) {
      console.error('Error in Frontend Sign Up');
    }
  };

  const submit = () => {
    console.log(UN);
    console.log(PW);
    handleSignup();
  };

  return (
    <div className="box">
      <div className="welcome">
        <h2 className="welcome">Welcome to Maply</h2>
        <div>Come Join Your Friends! </div>
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
      <button
        className="yellowButton"
        id="homeButtons"
        onClick={() => submit()}
      >
        Sign Up
      </button>
    </div>
  );
};
export default Signup;
