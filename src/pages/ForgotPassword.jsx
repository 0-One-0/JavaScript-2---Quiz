import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AuthLayout from "./AuthLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

//Component
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();

    setErrorMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:5173/#/update-password",
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
                required
              />

              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </p>
              )}

              <button className="login-btn" type="submit">
                Send reset link
              </button>

              <div className="sign-up">
                <p>Remember your password?</p>
                <Link to="/login">Log in</Link>
              </div>
            </form>
          </>
        : <>
            <h2 className="login-title">Check your email</h2>
            <p className="login-subtitle">
              We’ve sent you a password reset link. Please check your email.
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

export default ForgotPassword;
