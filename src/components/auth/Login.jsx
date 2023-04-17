import React from "react";
import "../../styles/auth/auth.css"

const Login = () => {
  return (
    <form class="sign-in-form">
      <h2 class="title">Sign in</h2>
      <div class="input-field">
        <i class="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div class="input-field">
        <i class="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <button type="submit" class="btn solid">
        Login
      </button>
      <p class="social-text">Or Sign in with social platforms</p>
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

export default Login;
