import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import AuthLayout from "./AuthLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleUpdatePassword(e) {
    e.preventDefault();

    setErrorMessage("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setMessage("success");
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
        {!message ?
          <>
            <h2 className="login-title">Set new password</h2>

            <form className="login-form" onSubmit={handleUpdatePassword}>
              <label>New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

              <button className="login-btn" type="submit">
                Update Password
              </button>
            </form>
          </>
        : <>
            <h2 className="login-title">Password updated</h2>
            <p className="login-subtitle">
              Your password has been changed successfully.
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

export default UpdatePassword;
