import React from "react";
import "../../styles/auth/auth.css";
import { useFormik } from "formik";
import * as Yup from "Yup";

const SignUp = () => {
  const { handleChange, handleBlur, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string().min(3).required("Email is Required"),
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password should be more than 6 characters")
          .required("Password is required"),
        confirm_password: Yup.string()
          .required("Password is required")
          .oneOf([Yup.ref("password"), null], "Password does not match"),
      }),
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });
  return (
    <form className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" />
      </div>
      <button onClick={handleSubmit} type="submit" className="btn">
        Sign Up
      </button>
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        <a href="#" className="social-icon">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-google"></i>
        </a>
        <a href="#" className="social-icon">
          <i className="fab fa-linkedin-in"></i>
        </a>
      </div>
    </form>
  );
};

export default SignUp;
