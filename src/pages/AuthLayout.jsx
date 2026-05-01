import "../login.css";
import logo from "../assets/logo2.png";
import Footer from "../components/Footer";

function AuthLayout({ children }) {
  return (
    <div className="login-page">
      <img className="login-logo" src={logo} alt="logo" />

      <div className="login-main">{children}</div>

      <Footer />
    </div>
  );
}

export default AuthLayout;
