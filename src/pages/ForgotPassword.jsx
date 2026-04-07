import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

//Component
function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleResetPassword(e) {
    e.preventDefault();
    console.log("Reset password for:", email);
  }

  return (
    <AuthLayout>
      <div className="login-container">
        <h2 className="login-title">Forgot Password</h2>
        <p className="login-subtitle">
          Enter your email to reset your password
        </p>

        <form className="login-form" onSubmit={handleResetPassword}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="login-btn" type="submit">
            Send reset link
          </button>

          <div className="sign-up">
            <p>Remember your password?</p>
            <Link to="/login">Log in</Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
