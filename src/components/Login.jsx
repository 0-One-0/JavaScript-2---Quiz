import { useState } from "react";
import "../login.css";
import logo from "../assets/logo2.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  }

  function handleGoogleLogin() {
    console.log("Logga in med Google");
  }

  return (
    <div className="login-page">
      <img className="login-logo" src={logo} alt="logo" />

      <div className="login-main">
        <div className="login-container">
          <h2 className="login-title">Log in</h2>
          <p className="login-subtitle">Continue with your account</p>

          <button
            className="google-btn"
            type="button"
            onClick={handleGoogleLogin}
          >
            Continue with Google
          </button>

          <div className="divider">
            <span></span>
            <p>OR</p>
            <span></span>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>

      <p className="login-footer">© 2026 Flowly – All rights reserved</p>
    </div>
  );
}

export default Login;
