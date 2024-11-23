import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { jwtDecode } from "jwt-decode";
import { FaUserCircle } from "react-icons/fa"; // Install with `npm install react-icons`

import "../../CSS/style.css"; // Adjust the path if necessary

const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [click, setClick] = useState(false);
  const user = cookies.access_token ? jwtDecode(cookies.access_token) : null; // Decode the JWT to extract user info
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/loginsignup");
  };

  const handleClick = () => {
    setClick(!click);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [reportdropdownOpen, setReportDropdownOpen] = useState(false);

  const toggleReportDropdown = () => {
    setReportDropdownOpen(!reportdropdownOpen);
  };

  return (
    <nav>
      <div className="navbar-section container flex">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <h1 className="nav-title">KMWDS</h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="navbar flex">
          <ul>
            {/* Links for Admin */}
            {user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link to="/complaints" className="nav-link">
                    <span>Complaints</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/maps" className="nav-link">
                    <span>Maps</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addworker" className="nav-link">
                    <span>Worker</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/requests" className="nav-link">
                    <span>Requests</span>
                  </Link>
                </li>
                <li className="nav-item" onClick={toggleReportDropdown}>
                  
                    <span>Reports</span>
                  
                  {reportdropdownOpen && (
                    <ul
                      className="report-dropdown"
                    >
                      <li className="nav-item">
                        <Link
                          to="/reports/complaints-history"
                          className="nav-link"
                        >
                          <span>Complaints History</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/reports/connection-history"
                          className="nav-link"
                        >
                          <span>Connection History</span>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          to="/reports/water-distribution"
                          className="nav-link"
                        >
                          <span>Water Distribution Data</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </>
            )}

            {/* Links for Engineer */}
            {user?.role === "engineer" && (
              <>
                <li className="nav-item">
                  <Link to="/complaints" className="nav-link">
                    <span>Complaints</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/requests" className="nav-link">
                    <span>Requests</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/maps" className="nav-link">
                    <span>Maps</span>
                  </Link>
                </li>
              </>
            )}

            {/* Links for Citizen */}
            {user?.role === "citizen" && (
              <>
                <li className="nav-item">
                  <Link to="/complaints" className="nav-link">
                    <span>Complaints</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/your-connections" className="nav-link">
                    <span>Your Connections</span>
                  </Link>
                </li>
              </>
            )}

            {/* Login or Logout */}
            {user ? (
              <></>
            ) : (
              <li className="nav-item">
                <Link to="/loginsignup" className="nav-link">
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>

          {/* Profile Section */}

          {/* Profile Section */}
          {user ? (
            <div className="profile-section">
              <div className="profile" onClick={toggleDropdown}>
                <FaUserCircle size={32} />
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="dropdown">
                  <span>
                    <strong>Hello, {user?.name}</strong>
                  </span>
                  <span>ID: {user?.id}</span>
                  <span>ROLE: {user?.role}</span>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import Navlogo from './Navbar-logo'; // Ensure this path is correct
// import '../../CSS/style.css'; // Ensure this path is correct and `style.css` exists

// // https://chatgpt.com/share/673f9f61-5098-8011-a490-9df96198ee42

// const Navbar = () => {
//   return (
//     <nav>
//         <div className="navbar-section container flex">
//         <div className="navbar-logo">
//             <Link to = '/' ><h1 className="nav-title">KMWDS</h1></Link>
//         </div>

//         <div className="navbar flex">
//             <ul>
//             <li className="nav-item">
//                 <Link to="/complaints" className="nav-link">
//                 <span>Complaints</span>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/maps" className="nav-link">
//                     <span>Maps</span>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/add Worker" className="nav-link">
//                     <span>Worker</span>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/requests" className="nav-link">
//                     <span>Requests</span>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/reports" className="nav-link">
//                     <span>Reports</span>
//                 </Link>
//             </li>
//             <li className="nav-item">
//                 <Link to="/loginsignup" className="nav-link">
//                     <span>Login</span>
//                 </Link>
//             </li>
//             </ul>
//         </div>
//         </div>
//     </nav>
//   );
// }

// export default Navbar;
