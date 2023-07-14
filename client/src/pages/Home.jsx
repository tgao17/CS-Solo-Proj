import React, { useState } from 'react';
import {
  Link,
  Navigate,
  useNavigate,
  Routes,
  Route,
  Router,
  Outlet,
  useRoutes,
} from 'react-router-dom';
import Signup from './signup/Signup.jsx';
import Login from './login/Login.jsx';

const Default = () => {
  const navigate = useNavigate();
  return (
    <div className="box">
      <h2 className="welcome">Welcome to Maply</h2>
      <button
        className="yellowButton"
        id="homeButtons"
        onClick={() => navigate('/login')}
      >
        Login
      </button>

      <button id="homeButtons" onClick={() => navigate('/signup')}>
        Signup
      </button>
    </div>
  );
};

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="container">
      <div className="heroBox">
        <iframe
          height="88%"
          width="100%"
          frameBorder="0"
          src="http://www.youtube.com/embed/oHg5SJYRHA0?autoplay=1"
        ></iframe>
      </div>
      <Routes>
        <Route path="/" element={<Default />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/map" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/map" />
            ) : (
              <Signup setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
};

// const Home = () => {
//   return (
//     <Router>
//       <div className="container">
//         <div className="box">LOGO</div>
//         <div className="box">
//           <div className="title">Welcome to Maply!</div>

//           {/* button links*/}
//           <Link to="/login">
//             <button id="homeButtons">Login</button>
//           </Link>
//           <Link to="/signup">
//             <button id="homeButtons">Sign Up</button>
//           </Link>

//           {/* Routes here */}
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// };

export default Home;
