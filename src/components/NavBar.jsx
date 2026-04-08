import Links from "./Links";

function NavBar() {
  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <img className="logo-img" src="src\assets\logo2.png" alt="logo" />
      </div>
      <div className="avatar-continer">
        <div className="avatar-circle"></div>
      </div>
    </nav>
  );
}

export default NavBar;
