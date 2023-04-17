import { useFormik } from "formik";
import * as Yup from "Yup";
import React, { useState } from "react";

import "../../styles/auth/auth.css";
import Auth1 from "../../assets/auth1.svg";
import Auth2 from "../../assets/auth2.svg";
import SignUp from "../../components/auth/SignUp";
import Login from "../../components/auth/Login";

const AuthPage = () => {
  const [mode, setMode] = useState("sign-in-mode");
  const { handleChange, handleBlur, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password should be more than 6 characters")
          .required("Password is required"),
      }),
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });

  const modeChangeHandler = (mode) => {
    setMode(mode);
  };
  return (
    <div class={"container " + mode}>
      <div class="forms-container">
        <div class="signin-signup">
          <Login />
          <SignUp />
        </div>
      </div>

      <div class="panels-container">
        <div class="panel left-panel">
          <div class="content">
            <h3>3 Million+ Creators</h3>
            <p>
              Be a part of India's most active community of creators,
              performers, writers and artists across geographies and languages.
              Write your pieces, garner thousands of followers and make your
              work timeless
            </p>
            <button
              onClick={() => modeChangeHandler("sign-up-mode")}
              class="btn transparent"
              id="sign-up-btn"
            >
              Sign up
            </button>
          </div>
          <img src={Auth1} class="image" alt="Auth1" />
        </div>
        <div class="panel right-panel">
          <div class="content">
            <h3>100 Million+ Posts</h3>
            <p>
              Clocking more than 120 thousand posts a day, YourQuote is India's
              largest user generated content platform. Login Now and get
              started with your writing journey.
            </p>
            <button
              onClick={() => modeChangeHandler("sign-in-mode")}
              class="btn transparent"
              id="sign-in-btn"
            >
              Sign in
            </button>
          </div>
          <img src={Auth2} class="image" alt="Auth2" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
