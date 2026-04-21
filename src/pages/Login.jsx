import { useState } from "react";
import loginIcon from "../assets/login-icon.png";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LoginLayout from "./AuthLayout";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";

// Component
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useGSAP(() => {
    gsap.set(".login-container", {
      display: "none",
      position: "absolute",
      opacity: 0,
      y: 300,
      overflow: "hidden",
    });
    gsap.set(".login-logo", {
      y: 300,
      scale: 0.4,
    });
    gsap.set(".login-btn", {
      y: 300,
    });

    gsap.set(".sign-up, label, .forgot-password, .login-title, .login-subtitle", {
      opacity: 0,
    });
    gsap.set("input", {
      x: -500,
    });

    const tl = gsap.timeline();

    tl.to(".login-logo", {
      scale: 0.5,
      repeat: 3,
      yoyo: true,
      duration: 1,
      ease: "sine.inOut"
    })
      .to(".login-logo", {
        y: 0,
        duration: 1,
        scale: 0.8,
        ease: "power2.inOut",
      })
      .to(".login-container", {
        display: "block",
        y: 0,
        opacity: 1,
        position: "relative",
        duration: 1,
        ease: "power3.inOut",
      })
      .to("input", {
        x: 0,
        duration: 0.5,
        ease: "power4.inOut"
      })
      .to("label", {
        opacity: 1,
        duration: 0.5,
        ease: "power4.inOut"
      })
      .to(".forgot-password, .login-title, .login-subtitle",{
        opacity: 1,
        duration: 0.5,
        ease: "power4.inOut"
      })
      .to(".login-btn", {
        y: 0,
        ease: "power3.inOut",
      })
      .to(".sign-up", {
        opacity: 1,
        duration: 1,
        ease: "power1.inOut"
      });
      
  }, []);

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

  async function handleGoogleLogin() {
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }
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
