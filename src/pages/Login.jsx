import { useState } from "react";
import loginIcon from "../assets/login-icon.png";
import { Link } from "react-router-dom";
import LoginLayout from "./AuthLayout";

// Component
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
    <LoginLayout>
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

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>

          <button className="login-btn" type="submit">
            <span>Login</span>
            <img className="login-icon" src={loginIcon} alt="login icon" />
          </button>

          <div className="sign-up">
            <p>Not a member yet?</p>
            <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
}

export default Login;
