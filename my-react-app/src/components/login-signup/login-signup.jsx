import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./login-signup.css"; // Assuming you save the CSS separately.
import "../../CSS/style.css";

const LoginSignup = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // const handleSendOtp = () => {
  //   // Logic to send OTP
  //   setOtpSent(true);
  // };

  // const handleVerifyOtp = () => {
  //   // Logic to verify OTP
  //   setVerified(true);
  // };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();
  //   // Handle form submission logic
  //   console.log("Form submitted", { phone, email, password, otp });
  // };

  const handleSendOtp = async () => {
    const apiUrl = "http://localhost:5001/api/send-otp";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("OTP sent successfully");
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const handleVerifyOtp = async () => {
    const apiUrl = "http://localhost:5001/api/verify-otp"; // Corrected the endpoint

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, userEnteredOtp: otp }),
      });

      if (response.ok) {
        console.log("OTP verified successfully");
        setVerified(true);
        // Proceed with your additional actions, e.g., make the POST request
      } else {
        console.error("OTP verification failed");
        // You can handle the error and show an error message to the user
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (verified) {
      try {
        alert(JSON.stringify({ username, phone, email, password }));
        const response = await axios.post(
          "http://localhost:5001/auth/register",
          {
            username,
            phone: phone,
            email,
            password,
            role: "citizen",
          }
        );
        alert(response.data.message);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("OTP not sent");
    }
  };

  //LOGIN FUNCITONS START
  const [LOGINusername, setLOGINUsername] = useState("");
  const [LOGINpassword, setLOGINPassword] = useState("");
  const [, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const loginSuccessToast = () => {
    toast.success("Login successful", {
      position: "top-center",
    });
  };

  const loginFailToast = () => {
    toast.error("Invalid credentials, Please try again", {
      position: "top-center",
    });
  };

  const onLoginSubmit = async (event) => {
    event.preventDefault();
    console.log("entered");
    console.log(LOGINusername);
    try {
      const response = await axios.post("http://localhost:5001/auth/login", {
        username: LOGINusername, // Match the backend's expected keys
        password: LOGINpassword,
      });
      console.log(response);

      if (response && response.data) {
        if (response.data.token) {
          loginSuccessToast();
          setTimeout(() => {
            //UPDATING THE CURRENT COOKIE IN THE BROWSER WITH THE TOKEN
            setCookies("access_token", response.data.token);

            //MAKING AN ENTRACE IN THE LOCAL STORAGE WITH CURRENT USER INFO
            window.localStorage.setItem("userId", response.data.userID);

            navigate("/");
          }, 2000);
        } else {
          loginFailToast();
        }
      } else {
        console.error("Response or data is undefined:", response);
      }
    } catch (error) {
      toast.error(
        "An unknown error occured while logging in, Please try again",
        {
          position: "top-center",
        }
      );
    }
  };

  //LOGIN FUNCTIONS END

  return (
    <div className="login-signup">
      <div
        className={`login-signup-container ${
          isSignup ? "right-panel-active" : ""
        }`}
        id="login-signup-container"
      >
        <div className="form-container sign-in-container">
          <form onSubmit={handleFormSubmit}>
            <h1>Create Account</h1>
            <input
              type="phone"
              // id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="email"
              // id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              // id="signup-password"
              placeholder="Enter your password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              value={otp}
              disabled={!otpSent}
              placeholder="Enter OTP here"
              onChange={(e) => setOtp(e.target.value)}
            />
            <button type="button" onClick={handleSendOtp} disabled={otpSent}>
              Send OTP
            </button>
            <button type="button" onClick={handleVerifyOtp} disabled={!otpSent}>
              Verify OTP
            </button>
            <button type="submit" disabled={!verified}>
              Submit
            </button>
            <button type="button" onClick={() => setIsSignup(false)}>
              Sign In
            </button>
          </form>
        </div>

        <div className="form-container login-container">
          <form onSubmit={onLoginSubmit}>
            <h1>Login</h1>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={LOGINusername}
              autoComplete="username"
              onChange={(e) => setLOGINUsername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={LOGINpassword}
              autoComplete="off"
              onChange={(e) => setLOGINPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" onClick={() => setIsSignup(false)}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
