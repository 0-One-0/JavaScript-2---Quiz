import "../login.css";
import logo from "../assets/logo2.png";

function AuthLayout({ children }) {
  return (
    <div className="login-page">
      <img className="login-logo" src={logo} alt="logo" />

      <div className="login-main">{children}</div>

      <p className="login-footer">© 2026 Flowly – All rights reserved</p>
    </div>
  );
}

export default AuthLayout;
