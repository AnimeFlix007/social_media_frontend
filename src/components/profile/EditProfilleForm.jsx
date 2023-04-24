import React from "react";
import { useSelector } from "react-redux";
import "../../styles/profile/profile.css";
import "../../styles/profile/edit-profile.css";
import { MenuItem, TextField } from "@mui/material";

const EditProfilleForm = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <React.Fragment>
      <div style={{ position: "relative" }} className="header__wrapper">
        <header>
          <img src={user?.user?.bg_image} alt="bg_image" />
          <button
            style={{
              position: "absolute",
              top: "80%",
              right: "0%",
              zIndex: 100,
            }}
            className="primary-btn"
          >
            Choose Background Image
          </button>
        </header>
        <div className="cols__container">
          <div className="left__col">
            <div className="img__container">
              <img
                style={{ cursor: "pointer" }}
                src={user?.user?.avatar}
                alt={user?.user?.username}
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
          </div>
        </div>
      </div>
      <div className="edit-form-container">
        <TextField
          autoComplete={false}
          id="fullname"
          name="fullname"
          label="Full Name"
          variant="outlined"
          type="text"
        />
        <TextField
          id="username"
          name="username"
          label="Username"
          variant="outlined"
          type="text"
        />
        <TextField
          autoComplete={false}
          aria-autocomplete={false}
          id="email"
          type="email"
          name="email"
          label="E-mail"
          variant="outlined"
        />
        <TextField
          id="mobile"
          type="number"
          name="mobile"
          label="Phone No."
          variant="outlined"
        />
        <TextField
          id="website"
          type="text"
          name="website"
          label="Website"
          variant="outlined"
        />
        <TextField
          id="instagram"
          type="text"
          name="instagram"
          label="Instagram Handlename"
          variant="outlined"
        />
        <TextField
          id="gender"
          name="gender"
          label="Gender"
          select
          variant="outlined"
          fullWidth
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
      />
    </React.Fragment>
  );
};

export default EditProfilleForm;
