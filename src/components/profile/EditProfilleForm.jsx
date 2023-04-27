import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../styles/profile/profile.css";
import "../../styles/profile/edit-profile.css";
import { Button, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "Yup";
import { editProfile } from "../../context/slice/authSlice";
import { useNavigate } from "react-router-dom";

const editProfileSchema = Yup.object({
  fullname: Yup.string().max(25).trim().required("FullName is Required"),
  username: Yup.string().max(25).trim().required("Username is Required"),
  email: Yup.string().email().required("Username is Required"),
  mobile: Yup.string()
    .length(10, "Please enter a valid mobile no.")
    .required("Mobile No. is Required"),
  website: Yup.string(),
  instagram: Yup.string(),
  gender: Yup.string(),
  story: Yup.string().required("Please write something about you"),
});

const EditProfilleForm = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(user?.user?.avatar || "");
  const [bgImage, setBgImage] = useState(user?.user?.bg_image || "");
  const initialState = {
    fullname: user?.user?.fullname,
    username: user?.user?.username,
    email: user?.user?.email,
    mobile: user?.user?.mobile,
    website: user?.user?.website,
    instagram: user?.user?.instagram,
    gender: user?.user?.gender,
    story: user?.user?.story,
  };
  const { handleChange, handleBlur, handleSubmit, errors, values, touched } =
    useFormik({
      enableReinitialize: true,
      initialValues: initialState,
      validationSchema: editProfileSchema,
      onSubmit: (values, action) => {
        dispatch(
          editProfile({
            ...values,
            id: user?.user?._id,
            avatar,
            bg_image: bgImage,
          })
        );
      },
    });

  const getBase64Url = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAvatar(reader.result);
    };
  };
  const getBase64BgUrl = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBgImage(reader.result);
    };
  };

  const onChangeImageHandler = (e, type) => {
    const files = e.target.files;
    const file = files[0];
    getBase64Url(file);
  };

  const onChangeBgImageHandler = (e, type) => {
    const files = e.target.files;
    const file = files[0];
    getBase64BgUrl(file);
  };

  return (
    <React.Fragment>
      <div style={{ position: "relative" }} className="header__wrapper">
        <header>
          <img src={bgImage} alt="bg_image" />
          <input
            id="select-bgImg"
            accept="image/*"
            style={{ display: "none" }}
            type="file"
            onChange={onChangeBgImageHandler}
          />
          <label
            style={{
              position: "absolute",
              top: "80%",
              right: "0%",
              zIndex: 100,
            }}
            className="primary-btn"
            htmlFor="select-bgImg"
          >
            Choose Background Image
          </label>
        </header>
        <div className="cols__container">
          <div className="left__col">
            <label htmlFor="select-avatar">
              <div className="img__container">
                <img
                  style={{ cursor: "pointer" }}
                  src={avatar}
                  alt={user?.user?.username}
                  htmlFor="select-avatar"
                />
                <input
                  id="select-avatar"
                  accept="image/*"
                  style={{ display: "none" }}
                  type="file"
                  onChange={onChangeImageHandler}
                />
                <span></span>

                <div className="backdrop-img">
                  <i
                    className="bx bx-camera"
                    style={{
                      fontSize: "35px",
                      color: "white",
                      fontWeight: "500",
                    }}
                  ></i>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className="edit-form-container">
        <TextField
          id="fullname"
          name="fullname"
          label="Full Name"
          variant="outlined"
          type="text"
          value={values.fullname}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.fullname && errors.fullname}
          error={Boolean(touched.fullname && errors.fullname)}
        />
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          type="text"
          value={values.username}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.username && errors.username}
          error={Boolean(touched.username && errors.username)}
        />
        <TextField
          id="email"
          type="email"
          name="email"
          label="E-mail"
          variant="outlined"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.email && errors.email}
          error={Boolean(touched.email && errors.email)}
        />
        <TextField
          id="mobile"
          type="number"
          name="mobile"
          label="Phone No."
          variant="outlined"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.mobile && errors.mobile}
          error={Boolean(touched.mobile && errors.mobile)}
        />
        <TextField
          id="website"
          type="text"
          name="website"
          label="Website"
          variant="outlined"
          value={values.website}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.website && errors.website}
          error={Boolean(touched.website && errors.website)}
        />
        <TextField
          id="instagram"
          type="text"
          name="instagram"
          label="Instagram Handlename"
          variant="outlined"
          value={values.instagram}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.instagram && errors.instagram}
          error={Boolean(touched.instagram && errors.instagram)}
        />
        <TextField
          id="gender"
          name="gender"
          label="Gender"
          select
          variant="outlined"
          fullWidth
          value={values.gender}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.gender && errors.gender}
          error={Boolean(touched.gender && errors.gender)}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
        </TextField>
      </div>
      <TextField
        id="story"
        name="story"
        label="Story"
        fullWidth
        multiline
        rows={3}
        sx={{ ml: ".55rem", mr: ".55rem" }}
        value={values.story}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.story && errors.story}
        error={Boolean(touched.story && errors.story)}
      />
      <div className="btns-container">
        <Button onClick={handleSubmit} variant="contained">
          Save
        </Button>
        <Button
          onClick={() => navigate(`/profile/${user.user._id}`)}
          sx={{ ml: 2 }}
          variant="outlined"
        >
          Cancel
        </Button>
      </div>
    </React.Fragment>
  );
};

export default EditProfilleForm;
