import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

// Component
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    console.log("Signup:", username, email, password);
  }

  return (
    <AuthLayout>
      <div className="login-container">
        <h2 className="login-title">Sign up</h2>
        <p className="login-subtitle">Create a new account</p>

        <form className="login-form" onSubmit={handleSignup}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="login-btn" type="submit">
            Sign up
          </button>

          <div className="sign-up">
            <p>Already have an account?</p>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
