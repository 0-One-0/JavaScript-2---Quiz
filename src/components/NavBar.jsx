import Links from "./Links";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

function NavBar() {
  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <Link to="/"><img className="logo-img" src={logo} alt="logo" /></Link>
        
      </div>
      <div className="avatar-continer">
        <div className="avatar-circle"></div>
      </div>
    </nav>
  );
}

export default NavBar;
