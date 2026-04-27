import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AuthLayout from "./AuthLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

// Component
function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();

    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username,
        },
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setIsSuccess(true);
  }
  useGSAP(() =>{
    gsap.set(".login-container", {
      opacity: 0,
    });

    gsap.to(".login-container", {
      opacity: 1,
      duration: 1.2,
      ease: "power3.inOut"
    })
  }, [])

  return (
    <AuthLayout>
      <div className="login-container">
        {!isSuccess ?
          <>
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

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </p>
              )}

              <button className="login-btn" type="submit">
                Sign up
              </button>

              <div className="sign-up">
                <p>Already have an account?</p>
                <Link to="/login">Log in</Link>
              </div>
            </form>
          </>
        : <>
            <h2 className="login-title">Account created</h2>
            <p className="login-subtitle">
              Your account has been created successfully. You can now log in.
            </p>

            <div className="sign-up" style={{ marginTop: "20px" }}>
              <Link to="/login">Back to login</Link>
            </div>
          </>
        }
      </div>
    </AuthLayout>
  );
}

export default Signup;
