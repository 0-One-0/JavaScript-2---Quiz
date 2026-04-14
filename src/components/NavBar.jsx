import Links from "./Links";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <Link to="/"><img className="logo-img" src="src\assets\logo2.png" alt="logo" /></Link>
        
      </div>
      <div className="avatar-continer">
        <div className="avatar-circle"></div>
      </div>
    </nav>
  );
}

export default NavBar;
