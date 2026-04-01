import Links from "./Links";

function NavBar() {
  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <img src="src\assets\logo.png" alt="logo" />
      </div>
      <div className="login-continer">
        <div className="avatar-circle"></div>
      </div>
    </nav>
  );
}

export default NavBar;
