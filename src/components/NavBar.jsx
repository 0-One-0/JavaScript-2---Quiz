import Links from "./Links";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function NavBar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(data.user);
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return;
    }

    setUser(null);
    setIsOpen(false);
    navigate("/login");
  }

  const displayName =
    user?.user_metadata?.display_name || user?.user_metadata?.username || "";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <nav className="navbar-continer">
      <div className="links-continer">
        <Links />
      </div>
      <div className="logo-continer">
        <Link to="/">
          <img className="logo-img" src="src\assets\logo2.png" alt="logo" />
        </Link>
      </div>
      <div className="avatar-continer">
        {user && (
          <>
            <div className="avatar-circle" onClick={() => setIsOpen(!isOpen)}>
              {avatarLetter}
            </div>

            {isOpen && (
              <div className="dropdown-profile">
                <p className="dropdown-username">{displayName}</p>

                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  Profil
                </Link>

                <button type="button" onClick={() => setIsOpen(false)}>
                  Inställningar
                </button>

                <button type="button" onClick={handleLogout}>
                  Logga ut
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
