import { useState } from "react";
import loginIcon from "../assets/login-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LoginLayout from "./AuthLayout";

// Component
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <LoginLayout>
      <div className="login-container">
        <h2 className="login-title">Log in</h2>
        <p className="login-subtitle">Continue with your account</p>

        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        )}

        <form className="login-form" onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
