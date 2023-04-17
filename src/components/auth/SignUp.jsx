import React from "react";
import "../../styles/auth/auth.css"

const SignUp = () => {
  return (
    <form class="sign-up-form">
      <h2 class="title">Sign up</h2>
      <div class="input-field">
        <i class="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div class="input-field">
        <i class="fas fa-envelope"></i>
        <input type="email" placeholder="Email" />
      </div>
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" />
      </div>
      <button type="submit" class="btn">
        Sign Up
      </button>
      <p class="social-text">Or Sign up with social platforms</p>
      <div class="social-media">
        <a href="#" class="social-icon">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-twitter"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-google"></i>
        </a>
        <a href="#" class="social-icon">
          <i class="fab fa-linkedin-in"></i>
        </a>
      </div>
    </form>
  );
};

export default SignUp;
