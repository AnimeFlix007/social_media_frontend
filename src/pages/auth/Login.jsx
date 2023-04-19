import React, { useState } from "react";

import "../../styles/auth/auth.css";
import Auth1 from "../../assets/auth1.svg";
import Auth2 from "../../assets/auth2.svg";
import SignUp from "../../components/auth/SignUp";
import Login from "../../components/auth/Login";

const AuthPage = () => {
  const [mode, setMode] = useState("sign-in-mode");

  const modeChangeHandler = (mode) => {
    setMode(mode);
  };
  return (
    <div className={"Container " + mode}>
      <div className="forms-container">
        <div className="signin-signup">
          <Login />
          <SignUp />
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>3 Million+ Creators</h3>
            <p>
              Be a part of India's most active community of creators,
              performers, writers and artists across geographies and languages.
              Write your pieces, garner thousands of followers and make your
              work timeless
            </p>
            <button
              onClick={() => modeChangeHandler("sign-up-mode")}
              className="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={Auth1} className="image" alt="Auth1" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>100 Million+ Posts</h3>
            <p>
              Clocking more than 120 thousand posts a day, YourQuote is India's
              largest user generated content platform. Login Now and get
              started with your writing journey.
            </p>
            <button
              onClick={() => modeChangeHandler("sign-in-mode")}
              className="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={Auth2} className="image" alt="Auth2" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
