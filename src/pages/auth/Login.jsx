import { useFormik } from "formik";
import * as Yup from "Yup";
import React from "react";

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
  return <div>login</div>;
};

export default Login;
