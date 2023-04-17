import React from "react";
import "../../styles/auth/auth.css";
import { useFormik } from "formik";
import * as Yup from "Yup";

const SignUp = () => {
  const { handleChange, handleBlur, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        username: "",
        email: "",
        password: "",
        confirm_password: "",
      },
      validationSchema: Yup.object({
        username: Yup.string().min(3).required("Username is Required"),
        email: Yup.string()
          .email("Enter a valid email")
          .required("Email is Required"),
        password: Yup.string()
          .min(6, "Password should be more than 6 characters")
          .required("Password is required"),
        confirm_password: Yup.string()
          .oneOf([Yup.ref("password"), null], "Password does not match")
          .required("Confirm Password is required"),
      }),
      onSubmit: (values, action) => {
        console.log(values);
        action.resetForm();
      },
    });
  return (
    <form className="sign-up-form">
      <h2 className="title">Sign up</h2>
      <div
        className={
          Boolean(errors.username && touched.username)
            ? "input-field error-input"
            : "input-field"
        }
      >
        <i
          className={
            Boolean(errors.username && touched.username)
              ? "fas fa-user error-input"
              : "fas fa-user"
          }
        ></i>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          className={
            Boolean(errors.username && touched.username) && "error-input"
          }
          name="username"
          id="username"
          type="text"
          placeholder="Username"
        />
        {Boolean(errors.username && touched.username) && (
          <p className="helper-text">{errors.username}</p>
        )}
      </div>
      <div
        style={
          Boolean(errors.username && touched.username)
            ? { marginTop: "1.5rem" }
            : {}
        }
        className={
          Boolean(errors.email && touched.email)
            ? "input-field error-input"
            : "input-field"
        }
      >
        <i
          className={
            Boolean(errors.email && touched.email)
              ? "fas fa-envelope error-input"
              : "fas fa-envelope"
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
          Boolean(errors.email && touched.email) ? { marginTop: "1.5rem" } : {}
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
      <div
        style={
          Boolean(errors.password && touched.password)
            ? { marginTop: "1.5rem", marginBottom: "1.5rem" }
            : { marginBottom: "1.5rem" }
        }
        className={
          Boolean(errors.confirm_password && touched.confirm_password)
            ? "input-field error-input"
            : "input-field"
        }
      >
        <i
          className={
            Boolean(errors.confirm_password && touched.confirm_password)
              ? "fas fa-lock error-input"
              : "fas fa-lock"
          }
        ></i>
        <input
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirm_password}
          className={
            Boolean(errors.confirm_password && touched.confirm_password) &&
            "error-input"
          }
          type="text"
          name="confirm_password"
          id="confirm_password"
          placeholder="Confirm Password"
        />
        {Boolean(errors.confirm_password && touched.confirm_password) && (
          <p className="helper-text">{errors.confirm_password}</p>
        )}
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
