// import
import React, { useState, useEffect } from 'react';
import './src/styles/style.scss';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// import pages

import Home from './src/pages/Home.jsx';
import Signup from './src/pages/signup/Signup.jsx';
import Login from './src/pages/login/Login.jsx';
import Map from './src/pages/map/Map.jsx';

// render
const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check if out application is in session and change setIsLoggedIn here

  return (
    <Router>
      {/* <div>{isLoggedIn.toString()}</div> */}
      <Routes>
        <Route
          path="/*"
          element={
            <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path="/map"
          element={
            //   <PrivateRoute isLoggedIn={isLoggedIn}>
            <Map setIsLoggedIn={setIsLoggedIn} />
            //   </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <div className="body">
//       <Router>
//         <Routes>
//           <Route
//             path="/*"
//             element={
//               <Home setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
//             }
//           />
//           <Route path="/map" element={<Map setIsLoggedIn={setIsLoggedIn} />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };
