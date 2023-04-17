import React from "react";
import "../../styles/auth/auth.css";
import { useFormik } from "formik";
import * as Yup from "Yup";

const Login = () => {
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
  return (
    <form className="sign-in-form">
      <h2 className="title">Sign in</h2>
      <div
        className={
          Boolean(errors.email && touched.email)
            ? "input-field error-input"
            : "input-field"
        }
      >
        <i
          className={
            Boolean(errors.email && touched.email)
              ? "fas fa-user error-input"
              : "fas fa-user"
          }
        ></i>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          className={Boolean(errors.email && touched.email) && "error-input"}
          name="email"
          id="email"
          type="text"
          placeholder="E-mail"
        />
        {Boolean(errors.email && touched.email) && (
          <p className="helper-text">{errors.email}</p>
        )}
      </div>
      <div
        style={
          Boolean(errors.email && touched.email)
            ? { marginTop: "1.5rem", marginBottom: "1.5rem" }
            : { marginBottom: "1.5rem" }
        }
        className={
          Boolean(errors.password && touched.password)
            ? "input-field error-input"
            : "input-field"
        }
      >
        <i
          className={
            Boolean(errors.password && touched.password)
              ? "fas fa-lock error-input"
              : "fas fa-lock"
          }
        ></i>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={
            Boolean(errors.password && touched.password) && "error-input"
          }
          type="password"
          name="password"
          id="password"
          placeholder="Password"
        />
        {Boolean(errors.password && touched.password) && (
          <p className="helper-text">{errors.password}</p>
        )}
      </div>
      <button onClick={handleSubmit} type="submit" className="btn solid">
        Login
      </button>
      <p className="social-text">Or Sign in with social platforms</p>
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

export default Login;
